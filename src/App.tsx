import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useAdmin } from './hooks/useAdmin';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ArchitectureModal } from './components/ArchitectureModal';
import { AdminModal } from './components/AdminModal';
import { AdminBar } from './components/AdminBar';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types';
import { PROJECTS_DATA } from './data/projects';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    isAdmin,
    customData,
    login,
    logout,
    updateProfilePhoto,
    updateResume,
    updateBio,
    updateTitles,
    resetToDefaults
  } = useAdmin();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleSelectProjectById = (projectId: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar with Admin Sign-In & Theme Toggle */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isAdmin={isAdmin}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          customData={customData}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <About customData={customData} />
        <Skills />
        <Experience onSelectProject={handleSelectProjectById} />
        <Projects onOpenDiagram={(project) => setSelectedProject(project)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        resumeUrl={customData.resumeUrl}
        resumeFileName={customData.resumeFileName}
      />

      {/* Interactive Architecture Flow Modal */}
      <ArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Sign-In / Content Management Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        customData={customData}
        onLogin={login}
        onLogout={logout}
        onUpdatePhoto={updateProfilePhoto}
        onUpdateResume={updateResume}
        onUpdateBio={updateBio}
        onUpdateTitles={updateTitles}
        onReset={resetToDefaults}
      />

      {/* Floating Admin Active Bar */}
      <AdminBar
        isAdmin={isAdmin}
        onOpenModal={() => setAdminModalOpen(true)}
        onLogout={logout}
      />
    </div>
  );
}
