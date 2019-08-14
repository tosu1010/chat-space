$(document).on('turbolinks:load', function(){
  $(function() {
    var buildMessageHTML = function(message) {
      var body = message.body ? `${message.body}` : "";
      var image = message.image_url ? `<img src="${message.image_url}">` : ""
      var html = `<li class="message", data-message-id="${message.id}">
                    <ul class="message__info">
                      <li class="message__info message__user-name">
                        ${message.user_name}
                      </li>
                      <li class="message__info message__date">
                        ${message.created_at}
                      </li>
                    </ul>
                    <div class="message__text">
                      ${body}
                    </div>
                      ${image}
                  </li>`
      return html;
    }
    
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $(".message:last").data("message-id");
      // debugger;
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
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message){
          insertHTML += buildMessageHTML(message);
        });
        //メッセージが入ったHTMLを取得
        //メッセージを追加
        $(".messages").append(insertHTML);
        $("html, body").animate({scrollTop: $(document).height()});
      })
      .fail(function() {
        console.log('error');
      });
    };
    const group_messages_path = /http:\/\/.+\/groups\/\d+\/messages/;
    if(window.location.href.match(group_messages_path)){
      setInterval(reloadMessages, 5000);
    };
  });
});