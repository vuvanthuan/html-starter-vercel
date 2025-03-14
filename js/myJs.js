const textConfig = {
  text1: "Good morning em",
  text2: "Anh có điều này muốn hỏi em",
  text3: "Em sẽ chọn tin tưởng anh lần này chứ?",
  text4:
    "Lần này anh đã có đủ những gì em cần để co thể cùng em trải qua mọi thứ điều",
  text5: "Em quá mệt rồi anh",
  text6:
    "Lần cuối thôi nhé, em sẽ chờ đừng làm em thất vọng thêm một lần nào nữa",
  text7: "Anh có một kế hoạch sẽ làm lúc anh về em có muốn xem quá chứ",
  text8: "Nhắn tin vơi anh đi một câu nói của em giúp anh có động lực lắm đó",
  text9: "",
  text10: "Anh cảm ơn em vì đã chọn tin tưởng anh, anh ko để em thất vọng đâu",
  text11:
    "Chờ ngày anh về anh sẽ có một bất ngờ dành tặng cho em, chờ anh xíu nha thời gian sẽ trôi qua nhanh thôi",
  text12: "Em sẽ chờ mà, anh đừng phản bội en là được!",
  text13: "Tiếp theo",
};

$(document).ready(function () {
  var backgroundMusic = new Audio("../sound/ctcht.mp3");
  backgroundMusic.loop = true;

  // process bar
  setTimeout(function () {
    showPasswordPopup();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function showPasswordPopup() {
    $(".content").hide();
    Swal.fire({
      title: "Nhập mật khẩu",
      html: "<input type='password' id='passwordInput' class='form-control' placeholder='******'>",
      showCancelButton: false,
      confirmButtonText: "Xác nhận",
      allowOutsideClick: false,
      background: '#fff url("img/iput-bg.jpg")',
      preConfirm: () => {
        const password = document.getElementById("passwordInput").value;
        if (password !== "230906") {
          Swal.showValidationMessage("Mật khẩu không đúng!");
          return false;
        }
        return true;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        backgroundMusic.play();
        firstQuestion();
      }
    });
  }

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/hope.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    $(".content").hide(); // Ẩn nội dung ban đầu
    audio.play();

    // Thêm video trực tiếp vào body
    const videoElement = $(`
      <video id="connectVideo" autoplay muted style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; object-fit: cover; z-index: 9999;">
        <source src="../img/connect.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `);
    $("body").append(videoElement);

    const video = document.getElementById("connectVideo");

    // Xử lý khi video kết thúc
    video.onended = () => {
      videoElement.remove(); // Xóa video khỏi DOM
      $("#bg").css("background-image", "url(../img/background_end.jpg)");

      // Hiển thị ảnh ở giữa màn hình
      Swal.fire({
        html: `
          <img src="../img/qr_kehoach.jpg" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" alt="Your Image">
          <span style="display: block; text-align: center; margin-top: 20px; font-size: 16px; color: #fff;">
        Mật khẩu là ngày tháng năm bọn mình quen nhau viết theo định dạng ddmmyy
      </span>
        `,
        width: 500,
        padding: "3em",
        background: '#fff url("img/iput-bg.jpg")',
        showCancelButton: false,
        confirmButtonColor: "#fe8a71",
        confirmButtonText: textConfig.text13,
      }).then((result) => {
        if (result.isConfirmed) {
          triggerPopup(); // Gọi popup chính khi click nút
        }
      });
    };

    // Dự phòng: Nếu video không tự kết thúc, xóa sau 2.5 giây
    setTimeout(() => {
      if (!video.ended) {
        video.pause(); // Dừng video
        videoElement.remove(); // Xóa video
        $("#bg").css("background-image", "url(../img/background_end.jpg)");
        $(".content").fadeIn(200);

        // Hiển thị ảnh dự phòng
        Swal.fire({
          html: `
            <img src="../img/your_image.jpg" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" alt="Your Image">
          `,
          width: 900,
          padding: "3em",
          background: '#fff url("img/iput-bg.jpg")',
          showCancelButton: false,
          confirmButtonColor: "#fe8a71",
          confirmButtonText: textConfig.text8,
        }).then((result) => {
          if (result.isConfirmed) {
            triggerPopup(); // Gọi popup chính khi click nút
          }
        });
      }
    }, 2500); // 2.5 giây dự phòng
  });

  // Hàm hiển thị popup chính (giữ nguyên)
  function triggerPopup() {
    Swal.fire({
      html: `
        <img src="../img/qr_aothuat.jpg" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" alt="Next Image">
      `,
      width: 500,
      padding: "3em",
      background: '#fff url("img/iput-bg.jpg")',
      showCancelButton: false,
      confirmButtonColor: "#fe8a71",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = "https://www.instagram.com/wilson_vu94/";
          },
        });
      }
    });
  }
});
