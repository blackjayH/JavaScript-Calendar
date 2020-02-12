var today = null;
var year = null;
var month = null;
var firstDay = null;
var lastDay = null;

var $tdDay = null;
// var $tdSchedule = null;

$(document).ready(function() { // setting Calendar Page
  drawCalendar();
  settingData();
  drawData();
  
  $("#movePrevPage").on("click", function() {
    movePrevPage();
  });
  $("#moveNextPage").on("click", function() {
    moveNextPage();
  });
});

function drawCalendar() { // 테이블 그리기
  var drawTable = "";
  drawTable += '<table class="calendar">';
  drawTable += '<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>';
  for (var i = 0; i < 6; i++) { // 6행(1 ~ 31)
    drawTable += '<tr height="130">';
    for (var j = 0; j < 7; j++) { // 7열(SUN ~ SAT)
      drawTable += '<td style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap">';
      drawTable += '    <div class="cal-day"></div>';
      drawTable += '    <div class="cal-schedule"></div>';
      drawTable += '</td>';
    }
    drawTable += '</tr>';
  }
  drawTable += '</table>';
  $("#cal_tab").html(drawTable);
}

function settingData() { // 날짜 세팅
  $tdDay = $("td div.cal-day")
  // $tdSchedule = $("td div.cal-schedule")
  dayCount = 0; // index 변수
  today = new Date();
  year = today.getFullYear();
  month = today.getMonth() + 1;
  firstDay = new Date(year, month - 1, 1);
  lastDay = new Date(year, month, 0);
}

function drawData() { // 날짜 데이터 그리기
  $("#cal_title_year").text(year + ".");
  if (month < 10) {
    month = String("0" + month);
  }

  $("#cal_title_month").text(month);

  for (var i = firstDay.getDay(); i < firstDay.getDay() + lastDay.getDate(); i++) { // day
    $tdDay.eq(i).text(++dayCount);
  }

  for (var i = 6; i < 42; i += 7) { // SAT
    $tdDay.eq(i).css("color", "blue");
  }

  for (var i = 0; i < 42; i += 7) { // SUN
    $tdDay.eq(i).css("color", "red");
  }
}

function updateCalendar() { // 달력 데이터 업데이트
  dayCount = 0;
  firstDay = new Date(year, month - 1, 1);
  lastDay = new Date(year, month, 0);
  for (var i = 0; i < 42; i++) {
    $tdDay.eq(i).text("");
  }
  drawData();
}

function movePrevPage() { // prev month 이동
  month--;
  if (month <= 0) {
    month = 12;
    year--;
  }
  updateCalendar();
}

function moveNextPage() { // next month 이동
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  updateCalendar();
}
