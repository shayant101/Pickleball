'use client'

import { useState, useMemo } from 'react';
import { students } from '@/data/mockData';
import { Student } from '@/types';

export const useStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [playStyleFilter, setPlayStyleFilter] = useState<'all' | 'singles' | 'doubles' | 'tournament' | 'recreational'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           student.status.toLowerCase() === statusFilter;
      
      const matchesLevel = levelFilter === 'all' || 
                          student.level.toLowerCase() === levelFilter;
      
      const matchesPlayStyle = playStyleFilter === 'all' || 
                              student.playStyle.toLowerCase().includes(playStyleFilter);

      return matchesSearch && matchesStatus && matchesLevel && matchesPlayStyle;
    });
  }, [searchTerm, statusFilter, levelFilter, playStyleFilter]);

  const openDetailModal = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedStudent(null);
    setIsDetailModalOpen(false);
  };

  const openAddStudent = () => {
    setIsAddModalOpen(true);
  };

  const closeAddStudent = () => {
    setIsAddModalOpen(false);
  };

  return {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    levelFilter,
    setLevelFilter,
    playStyleFilter,
    setPlayStyleFilter,
    selectedStudent,
    isDetailModalOpen,
    isAddModalOpen,
    openDetailModal,
    closeDetailModal,
    openAddStudent,
    closeAddStudent
  };
};