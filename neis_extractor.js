javascript:(function(){
    // 1. 나이스 출결 테이블 행(tr)들을 가져옵니다.
    const rows = document.querySelectorAll("table tbody tr, .grid_table tr");
    let resultData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        // 나이스 표 컬럼 구조: [번호, 성명, 마감, 조회, 1교시...]
        if (cells.length >= 3) {
            const number = cells[0]?.innerText.trim();
            const name = cells[1]?.innerText.trim();
            const status = cells[2]?.innerText.trim(); // 마감/결석 상태 (예: 질병결석)

            // 번호가 숫자인 데이터 행만 추출
            if (number && !isNaN(number)) {
                resultData.push({
                    number: number,
                    name: name,
                    status: status || '정상'
                });
            }
        }
    });

    if (resultData.length === 0) {
        alert("출결 데이터를 찾지 못했습니다. 올바른 나이스 출결관리 페이지인지 확인해주세요.");
        return;
    }

    // 2. 추출된 데이터를 클립보드에 복사 가능한 문자열로 변환
    const jsonString = JSON.stringify(resultData, null, 2);
    
    // 클립보드 복사
    navigator.clipboard.writeText(jsonString).then(() => {
        alert(`총 ${resultData.length}명의 출결 데이터를 복사했습니다!\n출석부 앱에서 '붙여넣기'하여 연동하세요.`);
    }).catch(err => {
        console.log(jsonString);
        alert("데이터 추출 완료! (콘솔창에서 확인 가능합니다)");
    });
})();