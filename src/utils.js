import axios from "axios";

const AIKEK_FUNC_ADDR = `uDkavqXbZ1QOXt7SNr-cjxOYNAAplUzF4ob78LzMDL4`; 
// PbILSASd47G00ijDlqBOZD7aZSH3ZS2eX7LvXnFEWTU

async function getState() {
  try {
    return (
      await axios.get(`https://gateway.load.rs/bundle/0x6c05cd5b64db6685060e81e964a05ab960a5c82debd681b58ffd46c332bf0dba/0`)
    )?.data?.state;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function resolveDomain(domain) {
  try {
    const domains = (await getState())?.domains;
    const normalizedDomain = domain.normalize("NFKC");

    const resolved = domains.find((usr) => usr.domain == normalizedDomain);

    if (resolved) {
      return resolved;
    }

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function resolveAddr(addr) {
  try {
    const domains = (await getState())?.domains;

    const resolved = domains.find(
      (usr) => usr.owner.toLowerCase() == addr.toLowerCase() && usr.is_primary,
    );

    if (resolved) {
      return resolved;
    }

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getAllDomains(addr) {
  try {
    const domains = (await getState())?.domains;

    const resolved = domains.filter(
      (usr) => usr.owner.toLowerCase() == addr.toLowerCase(),
    );

    if (resolved) {
      return resolved;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllAddresses() {
  try {
    const domains = (await getState())?.domains;
    const addresses = Array.from(
      new Set(domains.map((domain) => domain.owner)),
    );
    return addresses;
  } catch (error) {
    console.log(error);
    return [];
  }
}
