// import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { Inject } from "@nestjs/common";
// import type { IUserRepository } from "src/Repository/Interface/IUserRepository";
// import { BaseResult } from "src/Model/Wrappers/BaseResult";
// import { User } from "src/Model/Entities/user.entity";
// import * as bcrypt from "bcrypt";
// import { AddUserCommand } from "../../Requests/Users/AddUserCommand";
// import { generateUsername } from "src/Domain/Helpers/GeneralHelpers";

// @CommandHandler(AddUserCommand)
// export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {

//     constructor(
//         @Inject('IUserRepository')
//         private readonly userRepository: IUserRepository,
//     ) {}

//     async execute(command: AddUserCommand): Promise<BaseResult<boolean>> {

//         let username = generateUsername(command.first_name, command.last_name);

//         let counter = 1;

//         while (await this.userRepository.existsByUsername(username)) {
//             username = `${username}${counter}`;
//             counter++;
//         }

        

//         const hashedPassword = await bcrypt.hash(
//             command.document_number,
//             10
//         );

//         const user = new User();

//         user.first_name = command.first_name;
//         user.last_name = command.last_name;
//         user.document_number = command.document_number;
//         user.username = username;
//         user.us_password = hashedPassword;

//         await this.userRepository.addAsync(user);

//         return BaseResult.ok();
//     }
// }