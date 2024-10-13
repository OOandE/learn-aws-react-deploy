import api from "./api";

export async function getShifts() {
  try {
    const res = await api.get(`shifts`);
    return res;
  } catch (err) {
    throw err;
  }
}
