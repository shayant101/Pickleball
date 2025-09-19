import { useState, useMemo } from 'react';
import { Student } from '@/types';
import { students as mockStudents } from '@/data/mockData';

export const useStudents = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const openStudentDetail = (student: Student) => setSelectedStudent(student);
  const closeStudentDetail = () => setSelectedStudent(null);
  const openAddStudent = () => setShowAddStudent(true);
  const closeAddStudent = () => setShowAddStudent(false);

  return {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedStudent,
    showAddStudent,
    openStudentDetail,
    closeStudentDetail,
    openAddStudent,
    closeAddStudent
  };
};