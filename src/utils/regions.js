import { fakerEN_US, fakerPL, fakerKA_GE } from "@faker-js/faker";

const Regions = {
  US: {
    hasMiddleName: true,
    faker: fakerEN_US,
    alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    label: "USA",
  },
  PL: {
    hasMiddleName: false,
    faker: fakerPL,
    alphabet:
      "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(
        ""
      ),
    label: "Poland",
  },
  GE: {
    hasMiddleName: false,
    faker: fakerKA_GE,
    alphabet: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split(""),
    label: "Georgia",
  },
};

export default Regions;
