# Sophia CISO Assistant

Early-stage backend for the Sophia CISO Assistant project.

## Framework & Mapping Catalog

Sophia CISO Assistant ships a catalog of compliance frameworks (ISO
27001, PCI-DSS, SOC 2, BSI IT-Grundschutz, NIST, ANSSI guides, and
many more) plus the cross-framework mappings between them (e.g. "this
ISO 27001 clause corresponds to that PCI-DSS requirement"), both
converted from intuitem's open-source YAML library. Since this project
is closed-source, every framework's descriptive text was independently
reworded rather than copied verbatim, to stay clear of AGPL/copyright
exposure. Mappings are pure structural data (which control in
framework A corresponds to which control in framework B) and carry no
such concern.

**Status: complete — both frameworks and mappings** (re-verified
2026-07-20).

| Metric | Count |
|---|---|
| Frameworks in DB | **180** (179 from this pipeline + 1 legitimate pre-existing legacy row — load-bearing, kept on purpose, see [Known exceptions](#known-exceptions-not-bugs)) |
| Controls in DB | **64,025** |
| Control mappings in DB | **38,763** |
| Orphaned controls (integrity check) | **0** |
| Patch files (`patches/*.py`) | **116** |
| Mapping files converted (`mappings/*.json`) | **50** of 52 (2 permanently impossible — no source file) |

Full details: [`backend/framework/converted/README.md`](backend/framework/converted/README.md)
(framework pipeline), [`backend/framework/converted/patches/README.md`](backend/framework/converted/patches/README.md)
(patch contract), `MISSING_FRAMEWORKS_TODO.md` and `MAPPING_TODO.md`
at the project root (resolution history for both tracks).

**Jump to:** [1. Frameworks](#1-frameworks) · [2. Patches](#2-patches) ·
[3. Mappings](#3-mappings) · [Why the 180th framework row is legitimate](#why-the-180th-framework-row-is-legitimate)
· [Why 2 mappings are permanently impossible](#why-2-mappings-are-permanently-impossible)
· [4 duplicate rows that were deleted](#4-duplicate-rows-that-were-found-and-deleted)

---

### 1. Frameworks

267 raw YAML files live under `backend/framework/*.yaml`. Not all of
them are control frameworks — each file's `objects` key was inspected
directly (never guessed from the filename) to sort them:

| Shape (`objects` key) | Count | What it is | Convertible? |
|---|---|---|---|
| `framework` (+ optional `reference_controls`/`threats`) | 186 | An actual control framework | ✅ Yes — the framework pipeline |
| `requirement_mapping_set(s)` | 52 | A cross-framework control mapping | ✅ Yes — the mapping pipeline, see [§3](#3-mappings) |
| `risk_matrix` | 11 | Probability/impact/color grid definitions | ❌ No schema yet |
| `preset` | 11 | Onboarding/project-scaffolding config | ❌ No schema yet |
| `threats` | 3 | Threat-scenario libraries | ❌ No schema yet |
| `reference_controls` only | 2 | Standalone control catalog, no requirement tree | ❌ Nothing to attach it to |
| `reference_controls` + `threats` | 1 | Same as above, combined | ❌ No |
| `metric_definitions` | 1 | KPI/metric definitions | ❌ No |

Of the 186 convertible framework files, every one's `copyright` field
was read individually and bucketed by license risk, which decided how
its text could be reused:

| Bucket | Count | Treatment |
|---|---|---|
| Open License (Etalab, OGL, CC BY 4.0, etc.) | 16 | Independently reworded anyway — intuitem's own extraction is still separate creative work |
| Law / Official-text (regulations, gazettes, circulars) | 7 | Faithful independent restatement — the law has no copyright holder, but the wording must still be original |
| Excluded — explicit NC/ND license | 5 | Hard-excluded, see `backend/framework/converted/EXCLUDED.md` |
| Everything else — unclear or commercial copyright | ~158 | Worst-case: fully independent rewording, treated as commercially copyrighted even if the real license is ambiguous |

**Pipeline:**

```
backend/framework/<source>.yaml
        │  convert_intuitem_yaml.py --source <source>.yaml --version <v> --output <basename>
        ▼
<basename>.json   (raw structure, copyright-UNSAFE as-is)
        │  patches/<basename>.py auto-runs immediately after conversion
        ▼
<basename>.json   (name/description rewritten in original wording — copyright-safe)
        │  import_framework() in app/services/catalog.py
        ▼
Postgres: frameworks + controls rows
        (+ auto-seeds any mappings/<basename>.json whose other side is already imported)
```

Every import is verified 4 ways before being considered done: 0
duplicate `ref_id`s in the patched JSON, the DB control count for that
framework matches the JSON's node count exactly, and 0 orphaned
controls (a `parent_id` pointing nowhere).

---

### 2. Patches

A patch is a standalone Python script — `patches/<output_basename>.py`,
one per converted framework — that rewrites a specific framework
JSON's `name`/`description` fields in independently-original wording
when the raw conversion output isn't copyright-safe as-is.

| Rule | Why |
|---|---|
| Never touches `ref_id`, `is_evaluable`, or tree shape | Mapping files reference controls by `ref_id` — changing it would silently break every `ControlMapping` pointing at that framework |
| Resolves its target path relative to its own file location | Runs identically on any machine/CI, no hardcoded absolute paths |
| Runnable standalone and idempotent | Running it twice produces the same result — it only ever rewrites `name`/`description` by `ref_id` |
| Auto-runs immediately after `convert_intuitem_yaml.py` | A framework can never be left in the raw, copyright-unsafe state — no second manual step to forget |
| A few share logic via Python imports | Closely-related editions (e.g. `soc2_2017_rev_2022.py` imports and extends `soc2_2017.py`'s translation dict) avoid duplicating the same wording |

**116 patch files** as of this writing — one per converted framework
(too many to enumerate; see `patches/README.md`). Two representative
examples:

| Patch | Why |
|---|---|
| `iso27001_2022.py` | ISO/IEC 27001:2022 is commercially copyrighted; intuitem's own descriptions paraphrase the standard. Rewritten in original wording, facts/structure only. |
| `anssi_guide_hygiene.py` | ANSSI's guide itself is safe (Licence Ouverte), but intuitem's English translation is their own separate creative work under AGPL. Translated independently from the French original instead. |

---

### 3. Mappings

`convert_mappings.py` converts intuitem's `requirement_mapping_set(s)`
YAML files into pure `{source_ref_id, target_ref_id, relationship}`
correspondence lists — no prose, no copyright concern. A mapping only
converts once **both** its source and target frameworks already exist
as `frameworks` rows in the DB, matched by exact `(name, version)`.

Of the 52 mapping-type source files: **50 converted and seeded**
(38,763 `control_mappings` rows total), **2 permanently impossible**.

#### Why 2 mappings are permanently impossible

Both of these reference a source framework file that simply doesn't
exist — not "not yet converted", but genuinely absent from the
`backend/framework/` directory, confirmed by directly listing every
file whose name starts with `cis` (only 4 exist:
`cis-benchmark-kubernetes.yaml`, `cisa-cpg-2.0.yaml`,
`cisa-vendor-scrm.yaml`, `cisco-ccf-v3.0.yaml` — no `cis-controls-v8*`
of any kind). There is no file to ever convert them from, so these
stay permanently out of scope unless a `cis-controls-v8*.yaml` file is
added to the repo in the future.

| Mapping file (in `backend/framework/`) | Would map | Missing source file |
|---|---|---|
| `mapping-cis-controls-v8-and-iso27001-2022.yaml` | CIS Controls v8 → ISO/IEC 27001:2022 | `cis-controls-v8*.yaml` — does not exist |
| `mapping-cis-controls-v8-and-scf-2025.2.2.yaml` | CIS Controls v8 → Secure Controls Framework 2025.2.2 | `cis-controls-v8*.yaml` — does not exist |

While seeding, a systemic bug was found and fixed: the converter
originally derived each `ref_id` from the URN suffix alone, but 8
frameworks (Cisco CCF v3.0, ITIL4, Loi 05-20 Morocco, FedRAMP rev5,
DORA, CCB CyFun 2025, DNSSI 2023-2, SOC 2 2017 rev 2022) have an
explicit `ref_id` field in their raw YAML that diverges from the URN
slug — and the DB was seeded via that explicit field. `convert_mappings.py`
now carries a small per-framework lookup table (`FRAMEWORK_SOURCE_FILES`)
that corrects for this automatically.

**All 50 converted mappings** (`ANSSI: SecNumCloud v3.2 (base)` below
is shorthand for `"ANSSI: SecNumCloud v3.2 - Qualification Requirements"`
— a separate `"... - Annex 2 (Recommendations to Sponsors)"` document
also exists in the DB but is never the target of these mappings; this
was verified by checking that the mapping YAMLs' sample `ref_id`s only
exist in the base document's 651 controls, not Annex 2's 15):

| Source framework | Target framework | Mapped pairs |
|---|---|---|
| NIST Cybersecurity Framework 2.0 | International standard ISO/IEC 27001:2022 | 343 |
| NIST SP 800-53 revision 5 | International standard ISO/IEC 27001:2022 | 642 |
| NIST SP-800-66 rev2 (HIPAA) | NIST CSF v1.1 | 1,657 |
| NIST SP-800-66 rev2 (HIPAA) | NIST Cybersecurity Framework 2.0 | 2,554 |
| NIST SP-800-66 rev2 (HIPAA) | NIST SP 800-53 revision 5 | 621 |
| NIS2 Annex (ENISA technical guidance) | NIST Cybersecurity Framework 2.0 | 2,243 |
| NIS2 Annex (ENISA technical guidance) | International standard ISO/IEC 27001:2022 | 954 |
| CJIS Security Policy 5.9 | CJIS Security Policy 5.9.5 | 1,476 |
| NIST CSF v1.1 | International standard ISO/IEC 27001:2022 | 180 |
| Adobe CCF v5 | BSI Cloud Computing Compliance Criteria Catalogue (C5) | 353 |
| Adobe CCF v5 | Cyber Essentials: Requirements for IT infrastructure v3.1 | 424 |
| Adobe CCF v5 | GSA FedRAMP rev5 | 400 |
| Adobe CCF v5 | International standard ISO/IEC 27001:2022 | 212 |
| Adobe CCF v5 | NIST CSF v1.1 | 102 |
| Adobe CCF v5 | PCI DSS 4.0.1 | 678 |
| Adobe CCF v5 | SOC 2 (2017, rev. 2022) | 1,066 |
| Digital Operational Resilience Act (DORA) | FINMA Circular 2023/01 | 267 |
| India DPDPA 2023 | Secure Controls Framework (SCF) 2025.2.2 | 120 |
| International standard ISO/IEC 27001:2013 | International standard ISO/IEC 27001:2022 | 134 |
| International standard ISO/IEC 27001:2022 | Secure Controls Framework (SCF) 2025.2.2 | 596 |
| International standard ISO/IEC 27001:2022 | ITIL 4 Management Practices | 194 |
| International standard ISO/IEC 27001:2022 | ANSSI: SecNumCloud v3.2 (base) | 455 |
| ISO 42001-2023 (AI management) | Secure Controls Framework (SCF) 2025.2.2 | 358 |
| PCI DSS 4.0.1 | Secure Controls Framework (SCF) 2025.2.2 | 1,218 |
| Secure Controls Framework (SCF) 2025.2.2 | Swift Customer Security Controls Framework v2025 | 192 |
| ANSSI: SecNumCloud v3.2 (base) | International standard ISO/IEC 27001:2022 | 455 |
| SOC 2 (2017, rev. 2022) | Secure Controls Framework (SCF) 2025.2.2 | 1,477 |
| SOC 2 (2017, rev. 2022) | International standard ISO/IEC 27001:2022 | 1,405 |
| Law No. 05-20 on Cybersecurity (Morocco) | International standard ISO/IEC 27001:2022 | 334 |
| International standard ISO/IEC 27001:2022 | Law No. 05-20 on Cybersecurity (Morocco) | 338 |
| Morocco DNSSI | International standard ISO/IEC 27001:2022 | 134 |
| International standard ISO/IEC 27001:2022 | Morocco DNSSI | 137 |
| NIST CSF v1.1 | NIST Cybersecurity Framework 2.0 | 185 |
| NIST Cybersecurity Framework 2.0 | Secure Controls Framework (SCF) 2025.2.2 | 469 |
| Cisco Cloud Controls Framework (CCF) v3.0 | BSI Cloud Computing Compliance Criteria Catalogue (C5) | 554 |
| Cisco Cloud Controls Framework (CCF) v3.0 | National Security Framework - ENS (Spain) | 3,054 |
| Cisco Cloud Controls Framework (CCF) v3.0 | GSA FedRAMP rev5 | 795 |
| Cisco Cloud Controls Framework (CCF) v3.0 | International standard ISO/IEC 27001:2022 | 692 |
| Cisco Cloud Controls Framework (CCF) v3.0 | NCSC Cyber Assessment Framework (CAF) v3.2 | 729 |
| Cisco Cloud Controls Framework (CCF) v3.0 | NIST SP 800-171 Rev. 2 | 470 |
| Cisco Cloud Controls Framework (CCF) v3.0 | NIST SP 800-171 Rev. 3 | 376 |
| Cisco Cloud Controls Framework (CCF) v3.0 | Secure Software Development Framework (SSDF) 1.1 | 162 |
| Cisco Cloud Controls Framework (CCF) v3.0 | PCI DSS 4.0.1 | 576 |
| Cisco Cloud Controls Framework (CCF) v3.0 | ANSSI: SecNumCloud v3.2 (base) | 686 |
| Cisco Cloud Controls Framework (CCF) v3.0 | SOC 2 (2017, rev. 2022) | 3,216 |
| NIS2 Annex (ENISA technical guidance) | CCB CyberFundamentals Framework - 2023-03-01 | 3,321 |
| CCB CyberFundamentals Framework - 2023-03-01 | CCB CyberFundamentals 2025 (CyFun) | 354 |
| CCB CyberFundamentals Framework - 2023-03-01 | International standard ISO/IEC 27001:2022 | 1,854 |
| RECYF - France Cyber Reference Framework | NIS2 Annex (ENISA technical guidance) | 223 |
| RECYF - France Cyber Reference Framework | International standard ISO/IEC 27001:2022 | 353 |

**Known gaps (not bugs)** — a handful of entries stay unresolved
because the mapping file was authored against a more granular/complete
edition of the source or target framework than what's currently
converted into this DB:

| Mapping | Unresolved | Reason |
|---|---|---|
| SOC 2 (2017, rev. 2022) ↔ SCF 2025.2.2 | 117 | Our SOC 2 import stops at `cc3.2.8`/`p1.1`/`p2.1`; the mapping wants finer sub-clauses (`cc3.2.9`, `p1.1.1`-`p1.1.7`, etc.) |
| ISO 42001-2023 ↔ SCF 2025.2.2 | 30 | Our ISO 42001 import starts at clause 4 and keeps `6.1` as one node; the mapping wants clause `3.0` and `6.1.1`-`6.1.4` |
| India DPDPA 2023 ↔ SCF 2025.2.2 | 28 | Our DPDPA import only covers Articles 1-17; the mapping references Articles 18-26 |
| International standard ISO/IEC 27001:2022 ↔ ITIL 4 | 3 | Target node `change-enablement` isn't in our imported ITIL4 edition |

See `MAPPING_TODO.md` for the full resolution history, including how
each fix above was diagnosed.

---

### Known exceptions (not bugs)

Two things in the numbers above look like they could be mistakes at a
glance. Neither is — here's the evidence for each.

#### Why the 180th framework row is legitimate

The framework pipeline only ever produces 179 rows (one per
successfully-converted source file). The DB has 180. The 180th is a
single specific row, and it's kept **on purpose**, not by oversight:

| Fact | Detail |
|---|---|
| Framework name / version | `"NIST Cybersecurity Framework"`, `"2.0"` |
| Database id | `9c954b73-c381-41e6-ad9f-14bdacd11123` |
| Created | 2026-07-13 ("Day 4") — **3 days before** the intuitem conversion pipeline existed (started "Day 5", ~2026-07-16) |
| Why it looks suspicious | It predates this whole project's pipeline, has the exact same 134-control count as the correctly-piped `"NIST CSF v2.0"` row, and reads like leftover test/demo data |
| Why it's actually load-bearing | **5,345 real `control_mappings` rows point at it** — 8 different mapping files, converted and seeded by design (`convert_mappings.py`'s own docstring explicitly targets this row's exact name, not `"NIST CSF v2.0"`) |
| Other dependents | 4 `control_evaluations` — 2 look like CI/pipeline test fixtures, but 2 belong to a real-looking org ("Netsole") running an actual "Q1 2026 Compliance Review" campaign |
| Decision | **Keep it.** Deleting it (or blindly "de-duplicating" it against the other NIST CSF 2.0 rows) would silently orphan 5,345 mappings and break a live-looking compliance campaign. It could still be *migrated* to the pipeline-correct row later, but only as a deliberate, confirmed step — never as an automatic cleanup. |

There are actually **3** DB rows that all represent NIST CSF 2.0
content (same 134 controls each) — this legacy one, the correctly
pipeline-imported `"NIST CSF v2.0"`, and `"NIST CSF v2.0 — Journey"`
(an extended/combined edition). Only the legacy one above is counted
as an "extra" row in the 180 total; the other two are normal pipeline
rows.

#### 4 duplicate rows that were found and deleted

Separately from the row above, 4 **accidental** duplicate framework
rows were created earlier in this project's history and have since
been removed — mentioned here so nobody re-discovers them and wonders
if they're still lurking:

| Duplicate | Controls | Signature that gave it away |
|---|---|---|
| Raw, untranslated **French** SecNumCloud v3.2 | 651 | Non-English name, sitting alongside the correct English row |
| Raw, untranslated **German** BSI IT-Grundschutz — APP module | 1,543 | Non-English name, duplicate of an already-completed module |
| Raw, untranslated **German** BSI IT-Grundschutz — OPS module | 1,297 | Non-English name, duplicate of an already-completed module |
| Raw/unpatched RTS-OVS-CONDUCT | 78 | All `description` fields `NULL` on evaluable controls — the exact signature of a patch that never ran |

**Root cause:** an agent dispatched for framework-translation work
reported "no DB import was run" — that self-report was inaccurate; the
orchestrating session only sees an agent's own summary text, not its
actual tool calls. All 4 were confirmed to have **zero dependents**
(no `control_evaluations`, no `control_mappings`) before deletion.
**Lesson applied since:** after any agent-based framework work, check
for stray duplicate rows by `created_at` timestamp and by content
(non-English names, all-NULL descriptions on evaluable controls) —
don't trust an agent's self-report alone.

## Python Version

The local virtual environment for this project is currently using Python 3.14.
Use the same Python version when working locally to avoid dependency or runtime
differences.

Note: the Docker backend image currently uses `python:3.12-slim`. If the Python
version is changed locally or in Docker, recreate the virtual environment and
rebuild the Docker image so dependencies are installed against the same runtime.

## Docker Commands

Start or rebuild the project:

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up -d --build
```

Stop containers:

```bash
docker compose down
```

Restart the backend:

```bash
docker compose restart backend
```

View backend logs:

```bash
docker compose logs -f backend
```

Run Alembic migrations inside Docker:

```bash
docker compose exec backend alembic upgrade head
```

Create a new migration:

```bash
docker compose exec backend alembic revision --autogenerate -m "migration message"
```
