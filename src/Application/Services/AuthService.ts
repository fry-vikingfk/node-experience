import {injectable} from "inversify";
import jwt, { TAlgorithm } from "jwt-simple";
import Config from "config";

import TokenFactory from "../../Infrastructure/Factories/TokenFactory";
import IEncryption from "../../InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../Infrastructure/Factories/EncryptionFactory";
import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";
import IUserDomain from "../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";

@injectable()
class AuthService implements IAuthService
{
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    public decodeToken (token: string): any // TODO: Add type
    {
        let TokenArray = token.split(" ");

        let secret: string = Config.get('jwt.secret');
        const algorithm: TAlgorithm = Config.get('encryption.bcrypt.algorithm');

        return jwt.decode(TokenArray[1], secret, false, algorithm);
    }

    public getPermissions(user: IUserDomain): string[]
    {
        let permissions: string[] = user.permissions;
        const roles: IRoleDomain[] = user.getRoles();

        for (const role of roles)
        {
            if (role.permissions)
            {
                 role.permissions.map( (rolePermission: string) => permissions.push(rolePermission));
            }
        }

        return [...new Set(permissions)];
    }
}

export default AuthService;
