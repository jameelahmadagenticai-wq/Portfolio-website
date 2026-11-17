import { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../data/profile';

export interface AdminCustomData {
  profilePhoto: string;
  resumeUrl: string;
  resumeFileName: string;
  bioText1: string;
  bioText2: string;
  titles: string[];
}

const DEFAULT_ADMIN_DATA: AdminCustomData = {
  profilePhoto: '/profile.png',
  resumeUrl: '/Jameel_Ahmad.pdf',
  resumeFileName: 'Jameel_Ahmad_CV.pdf',
  bioText1: "I am an AI/ML and Full-Stack Systems Engineer holding a Master's degree in Computer Science with a focus on Artificial Intelligence (2022–2024) and an M.Sc. in Information Technology (2015–2017). With 2+ years of production experience, I architect air-gapped intelligent systems, multi-agent graphs, and resilient distributed architectures.",
  bioText2: "Beyond cloud API integrations, I specialize in strict air-gapped environments where zero data can leave local infrastructure. Whether designing a multi-tenant restaurant POS with forced PostgreSQL Row Level Security (RLS) or developing an autonomous video synthesis bot with Whisper alignment, my focus is always on determinism, reliability, and zero data loss.",
  titles: PROFILE_DATA.titles
};

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_admin_auth') === 'true';
  });

  const [customData, setCustomData] = useState<AdminCustomData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_admin_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure valid photo path
        if (!parsed.profilePhoto || parsed.profilePhoto.includes('image_') || parsed.profilePhoto === '') {
          parsed.profilePhoto = '/profile.png';
        }
        return { ...DEFAULT_ADMIN_DATA, ...parsed };
      }
      return DEFAULT_ADMIN_DATA;
    } catch {
      return DEFAULT_ADMIN_DATA;
    }
  });

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'jameelahmadagenticai@gmail.com' && pass === 'Pakistan1320%') {
      setIsAdmin(true);
      localStorage.setItem('portfolio_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolio_admin_auth');
  };

  const saveCustomData = (updated: Partial<AdminCustomData>) => {
    const next = { ...customData, ...updated };
    setCustomData(next);
    localStorage.setItem('portfolio_admin_custom', JSON.stringify(next));
  };

  const updateProfilePhoto = (photoDataUrl: string) => {
    saveCustomData({ profilePhoto: photoDataUrl });
  };

  const updateResume = (fileDataUrl: string, fileName: string) => {
    saveCustomData({ resumeUrl: fileDataUrl, resumeFileName: fileName });
  };

  const updateBio = (bio1: string, bio2: string) => {
    saveCustomData({ bioText1: bio1, bioText2: bio2 });
  };

  const updateTitles = (newTitles: string[]) => {
    saveCustomData({ titles: newTitles });
  };

  const resetToDefaults = () => {
    setCustomData(DEFAULT_ADMIN_DATA);
    localStorage.removeItem('portfolio_admin_custom');
  };

  return {
    isAdmin,
    customData,
    login,
    logout,
    updateProfilePhoto,
    updateResume,
    updateBio,
    updateTitles,
    resetToDefaults
  };
}
