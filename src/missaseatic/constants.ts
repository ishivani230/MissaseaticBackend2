export const applRelationsPick = ["id", "email", "contactNumber", "firstName", "lastName", "remark1", "remark2", "remark3", "remark4", "remark5", "processingStatus"];

export const applRelations = {
  id: { id: { contains: "" } },
  email: { email: { contains: "" } },
  contactNumber: { contactNumber: { contains: "" } },
  firstName: { firstName: { startsWith: "" } },
  lastName: { lastName: { endsWith: "" } },
  middleName: { middleName: { contains: '' } },
  // "indianPassport": { "contains": "" },
  // "dateOfBirth": { "contains": "" },
  // "height": {"height":{ "contains": ""} },
  // "weight": { "contains": "" },
  // "bust": { "contains": "" },
  // "waist": { "contains": "" },
  // "hip": { "hip":{"equals": "" } },
  remark1: { remark1: { contains: "" } },
  remark2: { remark2: { contains: "" } },
  remark3: { remark3: { contains: "" } },
  remark4: { remark4: { contains: "" } },
  remark5: { remark5: { contains: "" } },
  processingStatus: { processingStatus: { equals: "" } },
  judgeId: { judgeId: { contains: "" } },
  // createdAt: { [OR{ createdAt: { gte: "" } } { createdAt: { lte: "" } }] },
  // OR: [{ createdAt: { createdAt: { gte: "" } } }, { createdAt: { createdAt: { lte: "" } } }] 
  // createdAt: { OR: [{ createdAt: { gte: "" } }, { createdAt: { lte: "" } } ] },
  // createdAt: { AND: [{{ createdAt: { gte: "" } },   } ]
};
