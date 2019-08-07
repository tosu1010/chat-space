$(function(){
  function buildHTML(message){
    let html = `<li class="message">
                  <ul class="message__info">
                    <li class="message__info message__user_name">
                      ${message.user_name}
                    </li>
                    <li class="message__info message__date">
                      ${message.created_at}
                    </li>
                  </ul>
                  <div class="message__text">`
    if(typeof message.body !== 'undefined'){
      html += `${message.body}`
    }
    if(message.image_url !== null){
      html += `<img src="${message.image_url}">`
    }
    html += `</div>
            </li>`
    return html;
  };

  $(".chat-form").on("submit", function(e){
    e.preventDefault();
    formData = new FormData(this);
    url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".messages").append(html);
      $(".chat-form__input__text").val("");
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $(".chat-form__send__submit-btn").removeAttr("disabled");
    });
  });
});
