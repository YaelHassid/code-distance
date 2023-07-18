var socket = io();
var code_blocks = document.querySelectorAll(".open-codeblock");
var my_user = null;
console.log("found code blocks: ", code_blocks);

class User {
    
    constructor(block_element) {
        this.code_block_id = parseInt(block_element.getAttribute("code-block-id"));
        this.nickname = document.querySelector("#user-nickname").value.trim();
    }
    
    data(){
        return {
            code_block_id : this.code_block_id,
            nickname : this.nickname
        };
    }

};
Array.from(code_blocks).forEach(function(element){
    element.addEventListener('click', function(e) {
        e.preventDefault();
        my_user = new User(e.target);
        if (my_user.nickname.length < 3) {
            alert("you must choose a nickname longer than 2 chars"); 
        } else {
            console.log("clicked block ", my_user.data());
            socket.emit('connect-to-room', my_user.data()); 
        }
    });
});
