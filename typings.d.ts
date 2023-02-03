export interface Post{
    _id:number
    _createdAt:string
    title:string
    author:{
        name:string
        image:string
    };
    mainImage:{
        asset:{
            url:string
        };
    };
    slug:{
        current:string;
    };
    body:[object]
}