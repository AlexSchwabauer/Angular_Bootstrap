declare class Firebase {
    constructor(firebaseUrl: string);
}


interface IReference { 
    $child(key: string): IReference;
    $add(value: any);
    $auth(token: string): ng.IPromise<any>;
    $remove(key: any);
    $save(key: any);
    $set(key: any);
    $getIndex(): any[];
    then();
}

interface IFirebaseService {
    (fb:Firebase):IReference;
}


interface IFirebaseSimpleLoginService {
    (fb: Firebase): IAuthReference;
   
}

interface IAuthReference {
    $getCurrentUser(): ng.IPromise<any>
    $login(provider: string, options?: Object[]): ng.IPromise<any>;
  
}