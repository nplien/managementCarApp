import {IStaffModel} from 'models/Staff.Model';

export const QLNhanVienFake: IStaffModel[] = [
  {
    id: 476925,
    name: '0393136705',
    phone: '0393136706',
    email: '',
    avatar: 'https://i.pinimg.com/736x/c9/ca/ac/c9caac78cbec5788a64cd6d2eb49ae38.jpg',
    gender: 'female',
    type: 'staff',
    status: 'active',
    created_at: 1652845043,
    updated_at: 1653480023,
    province: {
      id: 1,
      code: '201',
      name: 'Hà Nội',
      providers: [
        {
          code: 'ghn',
          province_id: '201',
          province_code: '4'
        }
      ],
      created_at: 1623118175,
      updated_at: 1623118170
    },
    district: {
      id: 705,
      code: '1484',
      name: 'Quận Ba Đình',
      providers: [
        {
          code: 'ghn',
          district_id: '1484',
          district_code: '1A01'
        }
      ],
      created_at: 1623118360,
      updated_at: 1623118360
    },
    ward: {
      id: 3120,
      code: '1A0112',
      name: 'Phường Thành Công',
      providers: [
        {
          code: 'ghn',
          ward_id: '',
          ward_code: '1A0112'
        }
      ],
      created_at: 1623118694,
      updated_at: 1623118694
    }
  },
  {
    id: 476924,
    name: 'Roy',
    phone: '0987654323',
    email: '',
    avatar: 'https://i.pinimg.com/736x/9d/57/fd/9d57fd4493d3d0e898a204eaed513139.jpg',
    gender: 'female',
    birthday: 1652845043,
    country: 'vn',
    address: '',
    type: 'staff',
    status: 'active',
    created_at: 1652841928,
    updated_at: 1653367502,
    province: {
      id: 1,
      code: '201',
      name: 'Hà Nội',
      providers: [
        {
          code: 'ghn',
          province_id: '201',
          province_code: '4'
        }
      ],
      created_at: 1623118175,
      updated_at: 1623118170
    },
    district: {
      id: 705,
      code: '1484',
      name: 'Quận Ba Đình',
      providers: [
        {
          code: 'ghn',
          district_id: '1484',
          district_code: '1A01'
        }
      ],
      created_at: 1623118360,
      updated_at: 1623118360
    },
    ward: {
      id: 3120,
      code: '1A0112',
      name: 'Phường Thành Công',
      providers: [
        {
          code: 'ghn',
          ward_id: '',
          ward_code: '1A0112'
        }
      ],
      created_at: 1623118694,
      updated_at: 1623118694
    }
  }
];
