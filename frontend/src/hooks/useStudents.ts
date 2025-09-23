import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Student, studentService } from '@/services/studentService';

export const useStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const {
    data: students = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.getStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const fullName = `${student.firstName} ${student.lastName}`;
      const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.playStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    isLoading,
    error,
    refetch,
    openStudentDetail,
    closeStudentDetail,
    openAddStudent,
    closeAddStudent
  };
};