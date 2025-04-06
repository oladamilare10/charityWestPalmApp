export const staffMembers = [
  {
    id: "ST001",
    name: "Sarah Thompson",
    role: "Senior Fundraising Coordinator",
    email: "sarah.t@compassionaid.org"
  },
  {
    id: "ST002",
    name: "Michael Chen",
    role: "Community Outreach Manager",
    email: "michael.c@compassionaid.org"
  },
  {
    id: "ST003",
    name: "Jessica Rodriguez",
    role: "Donor Relations Specialist",
    email: "jessica.r@compassionaid.org"
  },
  {
    id: "ST004",
    name: "David Kim",
    role: "Program Development Director",
    email: "david.k@compassionaid.org"
  },
  {
    id: "ST005",
    name: "Emily Parker",
    role: "Grant Writer",
    email: "emily.p@compassionaid.org"
  },
  {
    id: "ST006",
    name: "James Wilson",
    role: "Digital Marketing Specialist",
    email: "james.w@compassionaid.org"
  },
  {
    id: "ST007",
    name: "Maria Garcia",
    role: "Volunteer Coordinator",
    email: "maria.g@compassionaid.org"
  },
  {
    id: "ST008",
    name: "Robert Taylor",
    role: "Financial Manager",
    email: "robert.t@compassionaid.org"
  },
  {
    id: "ST009",
    name: "Lisa Anderson",
    role: "Events Coordinator",
    email: "lisa.a@compassionaid.org"
  },
  {
    id: "ST010",
    name: "John Murphy",
    role: "Operations Manager",
    email: "john.m@compassionaid.org"
  }
];

export const saveStaffReferral = (staffId) => {
  localStorage.setItem('referralStaffId', staffId);
};

export const getStaffReferral = () => {
  return localStorage.getItem('referralStaffId');
};

export const getReferringStaff = () => {
  const staffId = getStaffReferral();
  return staffMembers.find(staff => staff.id === staffId);
}; 