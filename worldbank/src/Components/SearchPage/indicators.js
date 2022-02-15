import Networking from "../Networking";

const networking = new Networking();

export const indicators = await networking.getDistinctIndicators();
