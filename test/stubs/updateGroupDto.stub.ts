import { UpdateGroupDto } from "../../src/group/dto/update-group.dto";

export const updateGroupDTO: UpdateGroupDto = {
  name: 'Admin',
  permissions: ['DELETE', 'UPLOAD_FILES', 'WRITE', 'READ'],
};
