export const mockEntryDoor = [
  {
    id: 3,
    name: "출입문1",
    category: "Reader",
    workPlace: {
      id: 1,
      name: "이즈원소프트",
      category: "ROOT",
      companyNm: "이즈원소프트",
      type: "-",
    },
    type: "VX",
  },
  {
    id: 4,
    name: "출입문2",
    category: "Reader",
    workPlace: {
      id: 1,
      name: "이즈원소프트",
      category: "ROOT",
      companyNm: "이즈원소프트",
      type: "-",
    },
    type: "VX",
  },
  {
    id: 5,
    name: "출입문3",
    category: "Reader",
    workPlace: {
      id: 2,
      name: "카카오AI 캠퍼스",
      category: "ROOT",
      companyNm: "카카오AI 캠퍼스",
      type: "-",
    },
    type: "VX",
  },
  /// way 1
  // {
  //   id: 1,
  //   name: "카카오 AI 캠퍼스",
  //   category: "Root",
  //   workPlace: "카카오 AI 캠퍼스",
  //   type: "-",
  //   children: [
  //     {
  //       id: 1,
  //       name: "출입문1",
  //       category: "Reader",
  //       workPlace: "이즈원소프트",
  //       type: "VX",
  //     },
  //   ],
  // },

  // /// way 2
  // {
  //   id: 1,
  //   name: "카카오 AI 캠퍼스",
  //   category: "Root",
  //   workPlace: "카카오 AI 캠퍼스",
  //   type: "-",
  //   parent: null,
  // },
  // {
  //   id: 2,
  //   name: "출입문1",
  //   category: "Reader",
  //   workPlace: "이즈원소프트",
  //   type: "VX",
  //   parent: 1,
  // },
];
