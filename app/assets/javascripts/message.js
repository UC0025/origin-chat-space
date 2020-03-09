$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id= ${message.id}>
         <div class="upper-message">
           <a class="upper-message__user-name">
             ${message.user_name}
           </a>
           <f class="upper-message__date">
             ${message.created_at}
           </f>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id= ${message.id}>
         <div class="upper-message">
           <a class="upper-message__user-name">
             ${message.user_name}
           </a>
           <f class="upper-message__date">
             ${message.created_at}
           </f>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__space__messages').append(html);  
      $('.main-chat__space').animate({ scrollTop: $('.main-chat__space__messages')[0].scrollHeight});
      $('form')[0].reset();
    })
   .fail(function() {
     alert("メッセージ送信に失敗しました");
   })
   .always(function() {
     $('.form__submit').prop("disabled", false);
   });
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      alert('error');
    });
  };

});

