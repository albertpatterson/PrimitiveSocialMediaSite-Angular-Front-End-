import { Injectable } from '@angular/core'
import { Post } from './../Post';

const mockPosts = [
            {poster: 'Carl', content: "From Carl"},
            {poster: 'Alan', content: "From Alan"},
            {poster: 'Mike', content: "From Mike"}
        ];

@Injectable()
export class PostService{
    getPosts(): Promise<Post[]> {
        // return Promise.resolve(mockPosts);
        return new Promise(r=>setTimeout(()=>r(mockPosts),1e3));
    }
}