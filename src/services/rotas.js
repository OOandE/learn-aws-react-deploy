import api from "./api";

export async function getRotas() {
  try {
    const res = await api.get(`rotas`);
    return res;
  } catch (err) {
    throw err;
  }
}
