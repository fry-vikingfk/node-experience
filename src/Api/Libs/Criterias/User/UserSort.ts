import Sort from "../../../../Lib/Concrets/Sort";

class UserSort extends Sort
{
    static readonly EMAIL: string = 'name';

    getFields(): any
    {
        return [
            UserSort.EMAIL
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[UserSort.EMAIL]: 'asc'}
        ];
    }
}

export default UserSort;