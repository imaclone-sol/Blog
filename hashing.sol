// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedBlog {
    struct BlogPost {
        string title;
        string content;
        address author;
        uint256 timestamp;
    }

    BlogPost[] public posts;

    function createPost(string memory _title, string memory _content) public {
        posts.push(BlogPost({
            title: _title,
            content: _content,
            author: msg.sender,
            timestamp: block.timestamp
        }));
    }

    function getPost(uint _index) public view returns (string memory, string memory, address, uint256) {
        BlogPost memory post = posts[_index];
        return (post.title, post.content, post.author, post.timestamp);
    }

    function getPostCount() public view returns (uint) {
        return posts.length;
    }
}