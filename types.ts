import React from 'react';

export interface NavItem {
  label: string;
  id: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle: string;
}

export interface ImpactCardProps {
  label: string;
  value: number;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}