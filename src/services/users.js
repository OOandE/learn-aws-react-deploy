import api from "./api";

export async function getServiceUsers() {
  try {
    const res = await api.get(`serviceusers`);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function createServiceUser(payload) {
  try {
    const res = await api.post(`serviceusers`, {
      ...payload,
      id: "",
    });
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getServiceUser(id) {
  try {
    const res = await api.get(`serviceusers/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getStaffMembers() {
  try {
    const res = await api.get(`staff`);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getStaff(id) {
  try {
    const res = await api.get(`staff/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
}

export async function createTeamUser(payload) {
  try {
    const res = await api.post(`teammembers`, {
      ...payload,
      id: "",
    });
    return res;
  } catch (err) {
    throw err;
  }
}
