(this.webpackJsonpfeedback=this.webpackJsonpfeedback||[]).push([[0],{132:function(e,t,n){},133:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(1),c=n(66),s=n.n(c),o=n(38),i=n(2),d=n(13),u=n.n(d),l=n(19),b=n(4),j=n(21),m=n.n(j),h=function(e){return void 0!==e.isAxiosError},f=function(e){var t=function(e){for(var t=(1e6*Math.random()).toString().split(".")[0];-1!==e.indexOf(t);)t=(1e6*Math.random()).toString().split(".")[0];return t}(e);return{search:"?board=".concat(t),roomCreator:!0}},O=function(e){var t=Object(r.useState)(""),n=Object(b.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)(),d=Object(b.a)(o,2),j=d[0],O=d[1];Object(r.useEffect)((function(){void 0!==e.location.state&&alert(e.location.state.message)}),[]);var v=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get("/api/current-rooms");case 3:t=e.sent,n=t.data,a=f(n),O(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==c){e.next=3;break}return alert("Room ID empty"),e.abrupt("return");case 3:return e.prev=3,e.next=6,m.a.get("/api/valid-room",{params:{boardId:c}});case 6:O({search:"?board=".concat(c),roomCreator:!1}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(3),h(e.t0)&&400===(null===(t=e.t0.response)||void 0===t?void 0:t.status)?alert(e.t0.response.data.message+" (".concat(c,")")):alert("Something went wrong."),s("");case 13:case"end":return e.stop()}}),e,null,[[3,9]])})));return function(){return e.apply(this,arguments)}}();return void 0!==j?Object(a.jsx)(i.a,{to:{pathname:"/board",search:j.search,state:{roomCreator:j.roomCreator,fromRedirect:!0}}}):Object(a.jsxs)("div",{className:"SplashScreen-main-div",children:[Object(a.jsx)("h1",{children:"Anonymous Feedback"}),Object(a.jsx)("button",{onClick:function(){return v()},children:"Create a room"}),Object(a.jsx)("h3",{children:"OR"}),Object(a.jsxs)("div",{className:"SplashScreen-join-room",children:[Object(a.jsx)("label",{htmlFor:"room-id",children:"RoomID:"}),Object(a.jsx)("input",{id:"room-id",name:"room-id",value:c,onChange:function(e){return s(e.target.value)},placeholder:"Enter Room ID"}),Object(a.jsx)("button",{onClick:function(){return p()},children:"Join an existing room using Room ID"})]})]})},v=n(22),p=n(68),g=n.n(p),x=n(41),k=n(69),C=n.n(k),w=function(e){return Object(a.jsx)("div",{children:Object(a.jsx)("button",{onClick:function(){e.socket.emit("toggle-votes")},children:"Toggle Vote Visibility"})})},y=function(e){switch(e){case 3:return"strong-agree";case 2:return"agree";case 1:return"partial-agree";case 0:return"neutral";case-1:return"partial-disagree";case-2:return"disagree";case-3:return"strong-disagree";default:return""}},S=function(e){var t=e.message,n=e.personalVote,r=e.voteMessage,c=e.hideVotes;return Object(a.jsxs)("div",{className:"FeedbackMessage-main-div",children:[Object(a.jsx)("div",{className:"FeedbackMessage-personal-vote ".concat(y(n)),children:Object(a.jsx)("strong",{children:n})}),Object(a.jsxs)("div",{className:"FeedbackMessage-info",children:[Object(a.jsxs)("div",{style:{alignSelf:"flex-end"},children:[Object(a.jsx)("button",{className:"FeedbackMessage-downvote-button",onClick:function(){return r(t,-1)},children:"D"}),Object(a.jsx)("button",{style:{color:"black"},className:"FeedbackMessage-upvote-button",onClick:function(){return r(t,1)},children:"U"})]}),Object(a.jsxs)("p",{children:[t.message," "]}),Object(a.jsxs)("p",{children:[" ",Object(a.jsxs)("strong",{children:["Total Votes: ",c?Object(a.jsx)("i",{style:{color:"grey"},children:"hidden by room owner"}):t.upvotes," "]})]})]})]})},I=function(e){var t=e.messageList,n=e.votedMessages,r=e.hideVotes,c=e.voteMessage;return Object(a.jsx)(a.Fragment,{children:t.map((function(e){var t=n.findIndex((function(t){return t.messageId===e.id})),s=-1===t?0:n[t].personalVotes;return Object(a.jsx)(S,{hideVotes:r,voteMessage:c,message:e,personalVote:s},e.id)}))})},M=function(e){var t=e.boardId,n=e.didCreate,c=Object(r.useState)([]),s=Object(b.a)(c,2),o=s[0],d=s[1],u=Object(r.useState)(""),l=Object(b.a)(u,2),j=l[0],m=l[1],h=Object(r.useState)(),f=Object(b.a)(h,2),O=f[0],p=f[1],g=Object(r.useState)(""),k=Object(b.a)(g,2),y=k[0],S=k[1],M=Object(r.useState)(),N=Object(b.a)(M,2),E=N[0],V=N[1],F=Object(r.useState)(!0),B=Object(b.a)(F,2),D=B[0],R=B[1],A=Object(r.useState)([]),T=Object(b.a)(A,2),J=T[0],L=T[1];if(Object(r.useEffect)((function(){return O?(function(e,t){e.on("toggle-votes",(function(e){console.log("TOGGLEED VOTES"),t(e)}))}(O,R),function(e,t){e.on("message",(function(e){t(e)}))}(O,d),function(e){e.on("error",(function(e){alert("Error: ".concat(e))}))}(O),function(e,t,n){e.on("creator-disconnect",(function(a){t(a.msg),setTimeout((function(){e.close(),t(""),n("/")}),a.timeout)}))}(O,V,S)):p(C.a.connect("https://feedback-dysiewicz.herokuapp.com",{query:"board=".concat(t)})),function(){O&&O.disconnect()}}),[O]),!O)return Object(a.jsx)("div",{});if(y)return Object(a.jsx)(i.a,{to:{pathname:"/",state:{message:"Disconnected due to admin inactivity"}}});return Object(a.jsxs)("div",{className:"ChatBoard-main-div",children:[Object(a.jsxs)("div",{className:"ChatBoard-header-content",children:[Object(a.jsx)("div",{className:"ChatBoard-info",children:Object(a.jsx)("div",{children:Object(a.jsxs)("h1",{children:["Anonymous Feedback: RoomID - ",t]})})}),Object(a.jsx)("div",{className:"ChatBoard-temp",children:n&&Object(a.jsx)(w,{socket:O,boardId:t})}),Object(a.jsx)("button",{className:"ChatBoard-download",onClick:function(){return function(e){var t,n="data:text/csv;charset=utf-8,",a=Object.keys(e[0]);a.forEach((function(e){return n+="".concat(e,",")})),n+="\n",e.forEach((function(e){a.forEach((function(t){n+="".concat(e[t],",")})),n+="\n"}));var r=encodeURI(n),c=document.createElement("a");c.setAttribute("href",r),c.setAttribute("download","feedback.csv"),c.setAttribute("id","feedback-download-temp"),document.body.appendChild(c),c.click(),null===(t=document.getElementById("feedback-download-temp"))||void 0===t||t.remove()}(o)},children:"Download Feedback"}),E&&Object(a.jsx)("h3",{style:{color:"red"},children:E})]}),Object(a.jsx)("div",{className:"ChatBoard-feedback-list",children:Object(a.jsx)("div",{className:"ChatBoard-feedback-grid",children:Object(a.jsx)(I,{messageList:o,votedMessages:J,hideVotes:D,voteMessage:function(e,t){var n=J.findIndex((function(t){return t.messageId===e.id}));if(-1===n)L([].concat(Object(x.a)(J),[{messageId:e.id,personalVotes:t}]));else{var a=J[n],r=Object(v.a)(Object(v.a)({},a),{},{personalVotes:a.personalVotes+t});if(Math.abs(r.personalVotes)>3)return alert("Can only vote 3 times per item");var c=J.filter((function(t){return t.messageId!==e.id}));L([].concat(Object(x.a)(c),[r]))}!function(e,t,n){e.emit("upvote",{message:t,value:n})}(O,e,t)}})})}),Object(a.jsxs)("div",{className:"ChatBoard-write-message",children:[Object(a.jsxs)("label",{htmlFor:"write-message",children:["Write a Message: ",Object(a.jsxs)("small",{children:[j.length,"/150"]})]}),Object(a.jsx)("textarea",{id:"write-message",name:"write-message",value:j,onChange:function(e){return m(e.target.value)}}),Object(a.jsx)("button",{id:"submit-message",name:"submit-message",onClick:function(){return function(){var e=function(e){return 0===e.length?"Message cannot be empty":e.includes("\n")?"New line characters are not permitted":e.length>150?"Maximum character limit of 300":null}(j);e?alert(e):(function(e,t){var n={user:e.id,message:t,upvotes:0};e.emit("message",n)}(O,j),m(""))}()},children:"Submit Message"})]})]})},N=function(){return Object(a.jsxs)("div",{className:"Error404Page-main-div",children:[Object(a.jsx)("h1",{children:"Error: 404"}),Object(a.jsx)("p",{children:"Sorry, we couldnt find the page you were looking for. Please double check that the room ID is correct."}),Object(a.jsx)("a",{href:"/",children:"Click here to go to the main screen"})]})},E=function(e){var t=Object(r.useState)(null),n=Object(b.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)({boardId:"",didCreate:!1}),i=Object(b.a)(o,2),d=i[0],j=i[1];return Object(r.useEffect)((function(){(function(){var t=Object(l.a)(u.a.mark((function t(){var n,a,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=e.location.search,!!/^\?board=[0-9]*$/.test(c)){t.next=4;break}return s(!1),t.abrupt("return");case 4:if(n=g.a.parse(e.location.search).board,!e.location.state){t.next=9;break}return j({boardId:n,didCreate:e.location.state.roomCreator}),s(!0),t.abrupt("return");case 9:return t.prev=9,t.next=12,m.a.get("/api/valid-room",{params:{boardId:n}});case 12:200===t.sent.status&&(a=!0),t.next=21;break;case 16:return t.prev=16,t.t0=t.catch(9),h(t.t0)&&400===(null===(r=t.t0.response)||void 0===r?void 0:r.status)?alert(t.t0.response.data.message+" (".concat(n,")")):alert("Something went wrong."),s(!1),t.abrupt("return");case 21:if(!0===a){t.next=24;break}return s(!1),t.abrupt("return");case 24:j({boardId:n,didCreate:!1}),s(!0);case 26:case"end":return t.stop()}var c}),t,null,[[9,16]])})));return function(){return t.apply(this,arguments)}})()()}),[]),null===c?Object(a.jsx)("div",{}):!1===c?Object(a.jsx)(N,{}):Object(a.jsx)(M,Object(v.a)({},d))},V=(n(132),function(){return Object(a.jsx)("div",{className:"App-main-div",children:Object(a.jsx)(o.a,{children:Object(a.jsxs)(i.d,{children:[Object(a.jsx)(i.b,{exact:!0,path:"/",component:O}),Object(a.jsx)(i.b,{path:"/board",component:E}),Object(a.jsx)(N,{})]})})})});s.a.render(Object(a.jsx)(V,{}),document.getElementById("root"))}},[[133,1,2]]]);
//# sourceMappingURL=main.d841fd97.chunk.js.map