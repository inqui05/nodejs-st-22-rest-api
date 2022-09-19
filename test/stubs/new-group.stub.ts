import { CreateGroupDto } from "../../src/group/dto/create-group.dto";

export const CreateGroupDtoStub: CreateGroupDto = {
  name: 'Admin',
  permissions: ['DELETE', 'UPLOAD_FILES', 'WRITE'],
};
