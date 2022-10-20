interface News {
    title: string;
    url: string;
    
};

interface hitsInterface{

    hits: Hit[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;

};

interface Hit {

    Children: any[];
    created_at: string;
    created_at_i: number;
    num_comments: number;
    objectID: string;
    parent_id: number;
    points: number;
    story_id: number; 
}

interface Item{
    id: number;
    created_at: string;
    created_at_i: number;
    type: string;
    author: string;
    title: string;
    url: string;
    text: string | null;
    points: number;
    parent_id: number | null;
    story_id: number | null;
    children: Item[];
}

export{News, hitsInterface, Hit, Item};
