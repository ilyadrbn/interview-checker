interface IInterviewInfo {
  id: string;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactWhatsUp?: string;
  contactPhone?: string;
  createdAt: Date;
}

export type { IInterviewInfo };
