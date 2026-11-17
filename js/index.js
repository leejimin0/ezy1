Chart.defaults.font.family = "'Pretendard', -apple-system, sans-serif";
Chart.defaults.color = '#64748b';

const commonTooltip = {
  backgroundColor: '#0f172a',
  titleFont: { size: 13, weight: '600' },
  bodyFont: { size: 13 },
  padding: 12,
  cornerRadius: 10,
  displayColors: true
};

// 1. 거주 지역 분포
new Chart(document.getElementById('regionChart'), {
  type: 'bar',
  data: {
    labels: [
      ['경기도 기타 시', '(구리·남양주·동두천·포천·하남)'],
      ['경기도 의정부시', '(민락·의정부·금오·신곡2동)'],
      ['서울특별시', '(노원·송파·동대문·도봉구)'],
      ['기타 권역', '(강원 춘천시 · 경남 거제시)']
    ],
    datasets: [{
      label: '인원',
      data: [5, 4, 4, 2],
      backgroundColor: ['#4f46e5', '#0284c7', '#0ea5e9', '#94a3b8'],
      borderRadius: 8,
      borderSkipped: false,
      barThickness: 24
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...commonTooltip,
        callbacks: {
          label: (ctx) => ` ${ctx.raw}명 (${((ctx.raw / 15) * 100).toFixed(1)}%)`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 6,
        ticks: { stepSize: 1 },
        grid: { color: '#f1f5f9', drawBorder: false }
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#334155', font: { size: 12, weight: '500' } }
      }
    }
  }
});

// 2. 주요 취미 분야별 참여 인원
new Chart(document.getElementById('hobbyChart'), {
  type: 'bar',
  data: {
    labels: [
      '음악 감상 · 콘서트',
      '악기 연주 (기타·우쿨렐레)',
      '영상 시청 (영화·애니·공포)',
      '게임 (피파 등)',
      '독서 · 그림 · 뜨개질',
      '수집 · 덕질 · 휴식',
      '운동'
    ],
    datasets: [{
      label: '참여 인원',
      data: [6, 5, 5, 3, 3, 3, 2],
      backgroundColor: [
        '#ec4899',
        '#8b5cf6',
        '#6366f1',
        '#0ea5e9',
        '#10b981',
        '#f59e0b',
        '#64748b'
      ],
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 18
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...commonTooltip,
        callbacks: {
          label: (ctx) => ` ${ctx.raw}명 선택`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 7,
        ticks: { stepSize: 1 },
        grid: { color: '#f1f5f9', drawBorder: false }
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#334155', font: { size: 12, weight: '500' } }
      }
    }
  }
});

// 3. 가장 아끼는 대상 비율
new Chart(document.getElementById('cherishChart'), {
  type: 'doughnut',
  data: {
    labels: [
      '가족 (8명 · 53.3%)',
      '나 자신 (4명 · 26.7%)',
      '반려동물·지인·건강 (3명 · 20.0%)'
    ],
    datasets: [{
      data: [8, 4, 3],
      backgroundColor: ['#f43f5e', '#4f46e5', '#10b981'],
      borderWidth: 3,
      borderColor: '#ffffff',
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: { size: 12, weight: '500' },
          color: '#334155'
        }
      },
      tooltip: {
        ...commonTooltip,
        callbacks: {
          label: (ctx) => ` ${ctx.label}`
        }
      }
    }
  }
});

// 4. 표 항목별 작성·제출 현황
new Chart(document.getElementById('statusChart'), {
  type: 'bar',
  data: {
    labels: [
      'GitHub 계정',
      '인스타그램',
      'GitHub Pages',
      '성별 응답'
    ],
    datasets: [
      {
        label: '입력/제출 완료',
        data: [15, 15, 14, 14],
        backgroundColor: '#0ea5e9',
        borderRadius: 6,
        barThickness: 34
      },
      {
        label: '미입력/미제출',
        data: [0, 0, 1, 1],
        backgroundColor: '#e2e8f0',
        borderRadius: 6,
        barThickness: 34
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          font: { size: 12, weight: '500' }
        }
      },
      tooltip: {
        ...commonTooltip,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}명 (${Math.round((ctx.raw / 15) * 100)}%)`
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false, drawBorder: false },
        ticks: { color: '#334155', font: { size: 12, weight: '500' } }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 15,
        ticks: { stepSize: 3 },
        grid: { color: '#f1f5f9', drawBorder: false }
      }
    }
  }
});

// =========================================================
// 5. 경동대학교 메트로폴캠퍼스(양주) 기준 인물별 위치 지도
// =========================================================
const CAMPUS = {
  name: '경동대학교 메트로폴캠퍼스 (양주)',
  address: '경기도 양주시 경동대학로 27 (고암동)',
  lat: 37.8266,
  lng: 127.0772
};

const STUDENTS = [
  { name: '김나림', address: '경기도 동두천시', lat: 37.9036, lng: 127.0604, hobby: '그림, 음악, 운동, 애니' },
  { name: '김보라', address: '경기도 의정부시 금오동', lat: 37.7523, lng: 127.0757, hobby: '공포 보기' },
  { name: '박종석', address: '경기도 의정부시 민락동', lat: 37.7456, lng: 127.0970, hobby: '일렉기타, 영화감상' },
  { name: '박준영', address: '경기도 의정부시 의정부동', lat: 37.7381, lng: 127.0459, hobby: '피파' },
  { name: '신단하', address: '경기도 의정부시 신곡2동', lat: 37.7351, lng: 127.0664, hobby: '위시 사랑하기' },
  { name: '최윤영', address: '서울특별시 도봉구 쌍문동', lat: 37.6486, lng: 127.0346, hobby: '음악 감상 및 연주(통기타&일렉)' },
  { name: '강민서', address: '서울특별시 노원구 상계동', lat: 37.6542, lng: 127.0704, hobby: '쿠리만쥬 인형 구매, 영화 시청, 음악 감상' },
  { name: '최윤지', address: '경기도 포천시', lat: 37.8949, lng: 127.2003, hobby: '우쿨렐레, 뜨개질' },
  { name: '김승기', address: '경기도 구리시 인창동', lat: 37.6033, lng: 127.1394, hobby: '네줄기타' },
  { name: '정유림', address: '서울특별시 동대문구 답십리2동', lat: 37.5714, lng: 127.0589, hobby: '콘서트 관람' },
  { name: '문민희', address: '경기도 남양주시', lat: 37.6360, lng: 127.2165, hobby: '게임' },
  { name: '이지민', address: '경기도 하남시 망월동', lat: 37.5612, lng: 127.1856, hobby: '독서' },
  { name: '윤수아', address: '서울특별시 송파구 마천동', lat: 37.4949, lng: 127.1528, hobby: '기타, 애니, 음악듣기' },
  { name: '민제희', address: '강원도 춘천시', lat: 37.8813, lng: 127.7298, hobby: '게임, 운동, 기깔나게 자기' },
  { name: '박정빈', address: '경상남도 거제시 장평동', lat: 34.8920, lng: 128.6015, hobby: '노래듣기' }
];

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const sortedStudents = STUDENTS.map((s) => ({
  ...s,
  distance: getDistanceKm(CAMPUS.lat, CAMPUS.lng, s.lat, s.lng)
})).sort((a, b) => a.distance - b.distance);

// 지도 초기화 (로컬 file:/// 환경에서도 차단 없는 ArcGIS 타일 적용)
const map = L.map('campusMap').setView([37.72, 127.13], 10);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri',
  maxZoom: 18
}).addTo(map);

// 학교 마커
const campusIcon = L.divIcon({
  className: '',
  html: `<div class="school-pin">🏫 경동대 메트로폴캠퍼스</div>`,
  iconSize: [0, 0]
});

L.marker([CAMPUS.lat, CAMPUS.lng], { icon: campusIcon, zIndexOffset: 1000 })
  .addTo(map)
  .bindPopup(`<strong>${CAMPUS.name}</strong><br>${CAMPUS.address}`);

// 학생 마커·연결선 및 우측 목록 생성
const memberListEl = document.getElementById('memberList');

sortedStudents.forEach((student) => {
  L.polyline(
    [
      [CAMPUS.lat, CAMPUS.lng],
      [student.lat, student.lng]
    ],
    {
      color: '#4f46e5',
      weight: 1.8,
      opacity: 0.55,
      dashArray: '5, 6'
    }
  ).addTo(map);

  const studentIcon = L.divIcon({
    className: '',
    html: `<div class="student-pin">${student.name}</div>`,
    iconSize: [0, 0]
  });

  const marker = L.marker([student.lat, student.lng], { icon: studentIcon })
    .addTo(map)
    .bindPopup(
      `<div style="font-family: Pretendard, sans-serif; line-height: 1.5;">
        <strong style="font-size: 14px; color: #0f172a;">${student.name}</strong><br>
        <span style="font-size: 12px; color: #475569;">📍 ${student.address}</span><br>
        <span style="font-size: 12px; color: #4f46e5; font-weight: 700;">📏 학교까지 직선거리: 약 ${student.distance.toFixed(1)}km</span><br>
        <span style="font-size: 11.5px; color: #64748b;">🎨 취미: ${student.hobby}</span>
      </div>`
    );

  const li = document.createElement('li');
  li.className = 'member-item';
  li.innerHTML = `
    <div class="member-info">
      <strong>${student.name}</strong>
      <span>${student.address}</span>
    </div>
    <span class="dist-badge">${student.distance.toFixed(1)}km</span>
  `;

  li.addEventListener('click', () => {
    document.querySelectorAll('.member-item').forEach((el) => el.classList.remove('active'));
    li.classList.add('active');
    map.flyTo([student.lat, student.lng], 12, { duration: 0.8 });
    marker.openPopup();
  });

  memberListEl.appendChild(li);
});

// 뷰 전환 버튼
const btnCapital = document.getElementById('btnCapitalView');
const btnKorea = document.getElementById('btnKoreaView');

btnCapital.addEventListener('click', () => {
  btnCapital.classList.add('active');
  btnKorea.classList.remove('active');
  map.flyTo([37.72, 127.13], 10, { duration: 0.8 });
});

btnKorea.addEventListener('click', () => {
  btnKorea.classList.add('active');
  btnCapital.classList.remove('active');
  map.flyTo([36.5, 127.8], 7, { duration: 0.8 });
});