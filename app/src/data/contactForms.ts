export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
  repliedAt?: string;
  repliedBy?: string;
}

// Mock contact forms data
export const contactForms: ContactForm[] = [
  {
    id: 'form-001',
    name: '陈女士',
    email: 'chen@example.com',
    phone: '13900139001',
    subject: 'product',
    message: '请问零糖罐子蛋糕可以定制口味吗？我想订购一批作为公司活动甜点。',
    submittedAt: '2024-03-15 10:30:00',
    status: 'new',
  },
  {
    id: 'form-002',
    name: '刘先生',
    email: 'liu@example.com',
    subject: 'cooperation',
    message: '我是某健身房的负责人，想了解批发合作的可能性。',
    submittedAt: '2024-03-14 15:45:00',
    status: 'read',
    notes: '已电话沟通，发送合作方案',
  },
  {
    id: 'form-003',
    name: '赵女士',
    email: 'zhao@example.com',
    phone: '13900139003',
    subject: 'order',
    message: '我昨天下的订单什么时候可以发货？订单号是MD20240313001',
    submittedAt: '2024-03-13 09:20:00',
    status: 'replied',
    repliedAt: '2024-03-13 11:00:00',
    repliedBy: '客服小王',
    notes: '已回复，预计3月14日发货',
  },
  {
    id: 'form-004',
    name: '孙先生',
    email: 'sun@example.com',
    subject: 'feedback',
    message: '生酮曲奇饼干口感很好，但是包装可以改进一下，建议增加密封条。',
    submittedAt: '2024-03-12 18:00:00',
    status: 'archived',
    notes: '已记录，反馈给产品部门',
  },
];

// Subject labels
export const subjectLabels: Record<string, string> = {
  product: '产品咨询',
  order: '订单查询',
  cooperation: '商务合作',
  feedback: '意见反馈',
  other: '其他',
};

// Contact form management functions
export const contactFormManager = {
  getAll: (): ContactForm[] => {
    return [...contactForms].sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  },

  getById: (id: string): ContactForm | undefined => {
    return contactForms.find((f) => f.id === id);
  },

  getByStatus: (status: ContactForm['status']): ContactForm[] => {
    return contactForms.filter((f) => f.status === status);
  },

  getNewCount: (): number => {
    return contactForms.filter((f) => f.status === 'new').length;
  },

  updateStatus: (id: string, status: ContactForm['status']): boolean => {
    const form = contactForms.find((f) => f.id === id);
    if (form) {
      form.status = status;
      if (status === 'replied') {
        form.repliedAt = new Date().toISOString();
        form.repliedBy = '管理员';
      }
      return true;
    }
    return false;
  },

  addNote: (id: string, note: string): boolean => {
    const form = contactForms.find((f) => f.id === id);
    if (form) {
      form.notes = note;
      return true;
    }
    return false;
  },

  // Submit new form (for frontend)
  submit: (data: Omit<ContactForm, 'id' | 'submittedAt' | 'status'>): ContactForm => {
    const newForm: ContactForm = {
      ...data,
      id: `form-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    contactForms.unshift(newForm);
    return newForm;
  },

  // Get statistics
  getStats: () => {
    const total = contactForms.length;
    const new_count = contactForms.filter((f) => f.status === 'new').length;
    const read = contactForms.filter((f) => f.status === 'read').length;
    const replied = contactForms.filter((f) => f.status === 'replied').length;
    
    const bySubject: Record<string, number> = {};
    contactForms.forEach((f) => {
      bySubject[f.subject] = (bySubject[f.subject] || 0) + 1;
    });

    return {
      total,
      new: new_count,
      read,
      replied,
      bySubject,
    };
  },
};
