import { utilService } from "./util.service";
import { spotifyService } from "./spotify.service.js";
export const genresService = {
  query,
  getGenreColor,
};

async function getGenreColor(genreId) {
  const genre = genres.find((genre) => genre.name === genreId);
  return genre.color;
}
const genres = [
  {
    name: "acoustic",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36g87IW7_IdHjhQRVBO0_KM6Cu_KT8v6VdjneipbaBx4pd4KO&s",
    color: "rgb(10, 141, 62)",
  },
  {
    name: "afrobeat",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VbOs-rWU8ZCgFdTR7WHHUK5KQ6Mz8IbHTfOKaAKsHAQ24qfN&s",
    color: "rgb(147, 15, 107)",
  },
  {
    name: "alt-rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqJcqMQheCxObDb08h6ivF9AgMzuw25p-WMa2YjF1MdKVHujDQ&s",
    color: "rgb(58, 3, 54)",
  },
  {
    name: "alternative",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMopfPij9P6TfaG6P7aqlsJnBamCMCgn-mvETLYXG5-4MAu68K&s",
    color: "rgb(200, 96, 25)",
  },
  {
    name: "ambient",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTLs24hhW3-goI7VrsB4fDr5H1IJpMcAC_JmvIgvqq7oHmike&s",
    color: "rgb(182, 121, 253)",
  },
  {
    name: "anime",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKfCM96YUM__0w9045tcBN2Kqzg5vVdpfYBlw8tcLWTZkTmEkL&s",
    color: "rgb(227, 178, 1)",
  },
  {
    name: "black-metal",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1F1DZe4E8hIiJ0404wG8NM1tDFqRA7qAAkObNflwxdWbkcKo&s",
    color: "rgb(90, 205, 80)",
  },
  {
    name: "bluegrass",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuY8KG4aXuPite2TyDMoZ9QFwRUHEThODFdBpHihPUYXN0iBo&s",
    color: "rgb(23, 205, 171)",
  },
  {
    name: "blues",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNbRE9WfesjZhdgzcIeQFsBaI-vw8zUga0ZynWVmV4EIHP1E&s",
    color: "rgb(193, 104, 184)",
  },
  {
    name: "bossanova",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTilVevWme6B2JsK8dTsodFZUOKCRfGN8Kayna8axzdE9kBvyA&s",
    color: "rgb(250, 130, 195)",
  },
  {
    name: "brazil",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBIO14qVSQ2cTECjtjTt0gasm7ZhceQ3rvMqArL7ZKI3zyIsM&s",
    color: "rgb(152, 32, 23)",
  },
  {
    name: "breakbeat",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9NpTtJqs34yhC2FW2YFhSPza9wOKT7RbJ2r_LndzvexxU5Gf&s",
    color: "rgb(209, 208, 228)",
  },
  {
    name: "british",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYt67nsm-2n_znY_ynfEEHONHh1ZxrPfRQcwd0wnUBNE1yv-s&s",
    color: "rgb(109, 10, 169)",
  },
  {
    name: "cantopop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkaFgK7PE1DJFQFeMrYdb4KZcoyUozjHVtK_CRJKm1DuXmVPh&s",
    color: "rgb(187, 48, 179)",
  },
  {
    name: "chicago-house",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxKngGnMBmCSq1POT5iQdcdQGw113HvnssSglVP0ztSktjGdI&s",
    color: "rgb(179, 52, 93)",
  },
  {
    name: "children",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-vjtn6f-ftpu7LGvMR-SAWwjf-HaE39RHXVhwAKkGmUwJ2js&s",
    color: "rgb(200, 200, 104)",
  },
  {
    name: "chill",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUHHZn_AnclgSL5pXmHKIbE0PVHFZXuCUPfnoMwkT6rGVs-BdK&s",
    color: "rgb(31, 206, 122)",
  },
  {
    name: "classical",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP1kNY1rc0GHjE_OIcyuQOjVrNnhVIy5xWuEMMOy3wHbWiqyI&s",
    color: "rgb(58, 47, 226)",
  },
  {
    name: "club",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Wp9WpZU_GKi9envgCXG2fQlLOiW28EcT_wefHR-3HZ3Ldzg&s",
    color: "rgb(88, 94, 150)",
  },
  {
    name: "comedy",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-GLYHB28piNk9rO3uhjwOu650Lhp0fJdkzrFBsXjPrDUPQuI&s",
    color: "rgb(219, 60, 187)",
  },
  {
    name: "country",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS_Feqvcr7XworpCnfYPKxaJ9Z_ohq8YUjiXnoy-lkb62LTg6X&s",
    color: "rgb(136, 128, 46)",
  },
  {
    name: "dance",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaVPaomG5jjCycTU8F80BvwFdWskDGIP5PwHaPoqtZapj0f_o&s",
    color: "rgb(99, 51, 242)",
  },
  {
    name: "dancehall",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpt5Cdm0X0pfEU5MIvNu11CpDCgHN3gQuml88quuclNsaPaQM&s",
    color: "rgb(137, 250,120)",
  },
  {
    name: "death-metal",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKuGOgkSSH6iCSG9ODbXePng_BhhErsIZUEP6H4E8601_KYCE&s",
    color: "rgb(82, 199, 232)",
  },
  {
    name: "deep-house",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qaGXJog-QkDFSQcnISpXgxF6enZpCl6_xdGbcKKpzfIs0Xw&s",
    color: "rgb(150, 1, 0)",
  },
  {
    name: "detroit-techno",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4eEf09tB9E0q0PW7MSRSFZsrEboWGMuTnMfsRAWmJ2gFSXDbz&s",
    color: "rgb(101, 44, 39)",
  },
  {
    name: "disco",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWliW_BE8LJFlxM4mf6_kI5UQMxsNCeV6i7HuKsSn-KahihiAQ&s",
    color: "rgb(128, 229, 53)",
  },
  {
    name: "disney",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVkoqPPkqyu1U8cp5m2hhjqex0ulfobpp7rgmDSGxkyN3_CJQv&s",
    color: "rgb(86, 142, 13)",
  },
  {
    name: "drum-and-bass",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLR71Yh_UicGfeShGJwQ06JNQ9uNtZEmKRWClnRq94I0HNclc&s",
    color: "rgb(113, 88, 93)",
  },
  {
    name: "dub",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggbKmZidC2HJo49H9NeeyjzluChD1-XmbiI1GOwPKSejv5GaW&s",
    color: "rgb(236, 111, 107)",
  },
  {
    name: "dubstep",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9tjx7o_gntbAkLZa8j4fA54xquQKiETg8YSkRtoEQutLPbFSY&s",
    color: "rgb(228, 72, 114)",
  },
  {
    name: "edm",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAiE40g7-b-6ge_XpbyqxqjoyFUXmG1b5eR4-mDVn-x2MR2U&s",
    color: "rgb(52, 183, 148)",
  },
  {
    name: "electro",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAcyo_-0TLtrnkI1yV36j-NVmDRyXREkR3GeNwFXT5tL-zeNO&s",
    color: "rgb(117, 215, 162)",
  },
  {
    name: "electronic",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDoUFy2rsrrtCZt0oTyyX2uOtLZyDXdZi8KjpYwK495AuXYL7&s",
    color: "rgb(156, 226, 28)",
  },
  {
    name: "emo",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnZgViG9GZnduFblJDvGE_doIJpuG2ps5e3LfSFS4jQXcMlI&s",
    color: "rgb(218, 123, 189)",
  },
  {
    name: "folk",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25wgOc8Y_iV89_vpGKvVppBQVUo_xz05Vt0zX7KSIPTFsnk4c&s",
    color: "rgb(65, 220, 12)",
  },
  {
    name: "forro",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbZ_Iahqz1-xlEw2NAczNZz6hSDqI-nDutN7-zhDw1Hu3Z7zM&s",
    color: "rgb(184, 196, 26)",
  },
  {
    name: "french",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRNniq-Hn6QLm9xyRaIduurQVdG2NF9xh5CxVScjiLG2oC2_Y&s",
    color: "rgb(90, 249, 143)",
  },
  {
    name: "funk",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdlQdiFYgb1yL-KA4BnNkbwhPw3uqGqPJodxfkHiXq4GB_VxNh&s",
    color: "rgb(189, 113, 114)",
  },
  {
    name: "garage",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5uN4c9kXC9xj9xDWMBEGLyv28PCBoqn0etIxIuVtAW6FnCSmR&s",
    color: "rgb(103, 222, 221)",
  },
  {
    name: "german",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3esYNiQs3Nc3FFezyOfJaiuEW1kNN_iuP23w7RGP-8Z2cQqSS&s",
    color: "rgb(175, 183, 194)",
  },
  {
    name: "gospel",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShjgLaZqR-pu3VyYlByJH3NXk0vfOptPgfh23gsGG3Al_A28E&s",
    color: "rgb(3, 236, 54)",
  },
  {
    name: "goth",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUYECOJ_vQJVqMBxO3ZUXbjX-aa3jF7dWeXW6J36k9qYvyl8&s",
    color: "rgb(93, 106, 112)",
  },
  {
    name: "grindcore",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStlcdBw-OR9BuaMr8Kz57WvEnVYOVuH6IVwVE9cfkpcUthlNc&s",
    color: "rgb(72, 210, 85)",
  },
  {
    name: "groove",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsldysmWpyWI6vDE8Y9t-kWy99WAmuQKhOvxZWhSU7DS5qWo&s",
    color: "rgb(131, 39, 85)",
  },
  {
    name: "grunge",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKbJSRTIE-AXgqHGFd27lauQ-rww6puQQ3n_lQLmvRb4GebDE&s",
    color: "rgb(97, 10, 17)",
  },
  {
    name: "guitar",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQmBFIoYsXt22RAPaRb5g3l7ApUBvJXP6urImPKfKfiWu1BI&s",
    color: "rgb(215, 5, 20)",
  },
  {
    name: "happy",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HhhgQ-iOp6XKsTiyjJdouRsX8gRfJmg2Ffq-X_1yCzFxoO-a&s",
    color: "rgb(60, 132, 213)",
  },
  {
    name: "hard-rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDAWiG2FWnI1eqR4zldqYApYza7uMyEfGulX_qhmMsIUQ_LY&s",
    color: "rgb(64, 27, 150)",
  },
  {
    name: "hardcore",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyTVWRlMcRMQdBegh2f-iKYWExXgLy18wzzZ6YuPNBbqIIuL-&s",
    color: "rgb(165, 127, 22)",
  },
  {
    name: "hardstyle",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIf_1nnJc1LZzDHX5Koz9sHnwkgaJyKDT0zN4V1Wf9UWFLTg&s",
    color: "rgb(242, 88, 62)",
  },
  {
    name: "heavy-metal",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR5zYCG2g4R9IoxzAUTKUOKE0pXHv3jSvlvpqdfMs0oM9INQbI&s",
    color: "rgb(109, 117, 103)",
  },
  {
    name: "hip-hop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvd05U2BfBcLRBFHY_UZ-tsLHCUPxbbU8K8Yl76YO6dWTLXDH&s",
    color: "rgb(117, 238, 128)",
  },
  {
    name: "holidays",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepRTno4JTt4VrftkYIYVcBk93-C3uHVqh_DsG5svBCabCOTHr&s",
    color: "rgb(3, 225, 77)",
  },
  {
    name: "honky-tonk",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaquAFwYeybdR-r9H00xJ5oTOPU8xBPMCx8bYj6syhAfyulbw&s",
    color: "rgb(125, 201, 91)",
  },
  {
    name: "house",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqrmArJY4fnOG99u5c-D3mkIC_UIMUpQ-UTeD0EZr8WhFtyo&s",
    color: "rgb(232, 99, 49)",
  },
  {
    name: "idm",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRygid4iM6bro6CvY-YWx68x4tiW0rJKF-0OLX-C997hkPYwo&s",
    color: "rgb(122, 67, 110)",
  },
  {
    name: "indian",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdClD-LGng2QPuliIifDO897lIisXCRCkn1CRuItIysSo-9g&s",
    color: "rgb(237, 154, 25)",
  },
  {
    name: "indie",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYtG8u4cUgtX5bPTQSL6TU15yYQoebNyqAmpSfzC9kXbz48ng&s",
    color: "rgb(193, 152, 72)",
  },
  {
    name: "indie-pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLVI_u5ww9StlgoGVW5EZk3RXx2-umcdvOqvncRtWPnzS5DKA&s",
    color: "rgb(201, 128, 81)",
  },
  {
    name: "industrial",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-rIqXAw-RVeNLYaVv2pbai4odFT-jygWc0FEr926wI-k5_40&s",
    color: "rgb(170, 20, 12)",
  },
  {
    name: "iranian",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMcRt-uzBAPfcSvoaY6_uQfSg0rPnEOnMKOsddkTU9JePRhOb8&s",
    color: "rgb(198, 29, 128)",
  },
  {
    name: "j-dance",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYifw4VNUPpytqUJTZDIN59uSbFYYVFQsYzWqPOGhEDakQ-Q&s",
    color: "rgb(52, 0, 87)",
  },
  {
    name: "j-idol",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9gc9k6nrZpHOQqR8w68eI-LhEt3gvaKUf5fmyJBqSz0L4Vw&s",
    color: "rgb(48, 174, 218)",
  },
  {
    name: "j-pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBI0xE8MlUiN80um-mPo6989UBFeggJBesV2XqgRNij_h66l3n&s",
    color: "rgb(108, 59, 60)",
  },
  {
    name: "j-rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgj2IKqoSVxCqW-BxaOLlpVg9Cuu7YnmIU0Zpi6FgjiQZkQA&s",
    color: "rgb(96, 186, 39)",
  },
  {
    name: "jazz",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0myyo7SENlBO7Q-5Rt06B669GjFJcX3awP8L02oEQ3eAifko&s",
    color: "rgb(51, 155, 130)",
  },
  {
    name: "k-pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-sem--UoqI1ZdXExtoOFjtyCZrLhazPlM8QF_iz8IfbtDrjdh&s",
    color: "rgb(168, 202, 63)",
  },
  {
    name: "kids",
    photo:
      "https://img.freepik.com/free-vector/little-girl-blowing-flute-with-music-notes-white-background_1308-110144.jpg?t=st=1717085413~exp=1717089013~hmac=9f061ef8e733d458e7c0d2bea7e55977df13fdf360b673fc2a25f29bfa4f2a85&w=1800",
    color: "rgb(11, 11, 100)",
  },
  {
    name: "latin",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5aNOoX1DVuDWGK5TuLYJAslZzRm24CbUZWD4qixLgkbcmhif&s",
    color: "rgb(184, 58, 61)",
  },
  {
    name: "latino",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxBb7i7n0fHktyuGijwJvP9gOUSf1kfKIGzmL_EKNwre7oF4&s",
    color: "rgb(119, 12, 145)",
  },
  {
    name: "malay",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0h6K59bd2OXe4HjjDoklcFrg6sKNVMPkhW_UIfWQU-tSVklw&s",
    color: "rgb(126, 150, 108)",
  },
  {
    name: "mandopop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-3Oj6l0kCt8wDZiKcv7A3fJXA84thOWoVNMh2kmU-3TjpOMY&s",
    color: "rgb(87, 141, 157)",
  },
  {
    name: "metal",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUHVBSciD_isoNp8jE1pzbvC7WMf9GmEyUmPtdnD-QLoUlvds&s",
    color: "rgb(84, 145, 213)",
  },
  {
    name: "metal-misc",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkCKIm3Qv0FXlh9ZC2H4g9DIQ5EctuVA24t2jHH81nwIlS-c&s",
    color: "rgb(7, 45, 17)",
  },
  {
    name: "metalcore",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEm_rjlK1xYEZzub-BCAZ2c-VOeduXORihtgAnFE4Cfl7uenw4&s",
    color: "rgb(232, 142, 7)",
  },
  {
    name: "minimal-techno",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KkoN9yFKeyzms8Lr1Lax5Lvf_x548hTytzXbkastWF4Y10Og&s",
    color: "rgb(11, 7, 151)",
  },
  {
    name: "movies",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSOp6CmvFmzODF0_Ipj-JNMC4pwz7WZ11idIHSXMvN72n9w_Ja&s",
    color: "rgb(186, 88, 221)",
  },
  {
    name: "mpb",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8At1Gay2OpihJ_PkPCFjWv6F15kM9UzykKV58DPE6dcXfu6oQ&s",
    color: "rgb(109, 217, 220)",
  },
  {
    name: "new-age",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhT06rgT5VDz1F_1vXPxvk91oCPD8sJQqqeb-XwA12zYvDH9X&s",
    color: "rgb(99, 150, 111)",
  },
  {
    name: "new-release",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsXh_KGT8fbJv9k5eGeHoPpBx6yjSFKS5hq-vSPT5MX-1_Wk&s",
    color: "rgb(18, 64, 136)",
  },
  {
    name: "opera",
    photo:
      "https://imgs.classicfm.com/images/609444?crop=16_9&width=660&relax=1&format=webp&signature=FZMM8AX-9Fy5JMnzk2Mz0CFscic=",
    color: "rgb(9, 132, 100)",
  },
  {
    name: "pagode",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewO3A3gfwnCnqEVJaSwepu-yHVqRk1TXB0gdTB9ydb-nQe7c&s",
    color: "rgb(247, 40, 69)",
  },
  {
    name: "party",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLN4wh1nhXIO8cR8AJQ8e2tz780JpFx2hTgdG2mXB0-hDBdA&s",
    color: "rgb(208, 101, 133)",
  },
  {
    name: "philippines-opm",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmdS5uOL5j1w949vr5fqxAzxITf6TRYW8JBI9D3NOztbRnXOw&s",
    color: "rgb(63, 97, 143)",
  },
  {
    name: "piano",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY5cdTOLZ19h9bkpqsFzZjwsthp9pCRp4feIxNJphAffgSy-f2&s",
    color: "rgb(58, 214, 164)",
  },
  {
    name: "pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ858PfWbfw9snszpKftBVJ5wQWAxK8eBN7smqxYrThB1pdVAA&s",
    color: "rgb(144, 59, 12)",
  },
  {
    name: "pop-film",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNAtEAFT-PwnXWUDqBXazf3CJof5wyiZOCVAeZD9zYtcUbfVH&s",
    color: "rgb(69, 124, 92)",
  },
  {
    name: "post-dubstep",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyioqnolMNrXBAhj9PXIKiGAN0oR0KVMQoBRBeKY7r4XnG2NSP&s",
    color: "rgb(193, 38, 23)",
  },
  {
    name: "power-pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmclTI8MVHFNgx3AsUbpdfBKYu2K32EL4R5Xt-3I2Q6wErlju&s",
    color: "rgb(239, 139, 34)",
  },
  {
    name: "progressive-house",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoUyPLtiUPgUZGePghnDnh8HwSonKcyTpwb6b3ALxodBFhEjdC&s",
    color: "rgb(48, 131, 179)",
  },
  {
    name: "psych-rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDLbm6dSCnbjg83uE0E6CJSZVd8-HkSMEgKzKrMbZhhRx4d7Y&s",
    color: "rgb(251, 203, 194)",
  },
  {
    name: "punk",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKAnm-vrY4WR7J1NbiOa5qpbKViGJbCuwMxRMG0-k7LIB3euPI&s",
    color: "rgb(150, 20, 20)",
  },
  {
    name: "punk-rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduPeIxN9Z-UyNwBKReP6eqZSC1UhB7BT8XDqG3ViSaWFp_2Ac&s",
    color: "rgb(166, 193, 182)",
  },
  {
    name: "r-n-b",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5DmTXhAPsN492GA92oHZhBLIfYIF1NZca5pYU_Zn5ztLJMwtV&s",
    color: "rgb(223, 85, 77)",
  },
  {
    name: "rainy-day",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDK7sOL8vWZcQ034ncd-eIlFWmsBOEj6dfM_JxYcVeddIAzAo&s",
    color: "rgb(174, 30, 154)",
  },
  {
    name: "reggae",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZjStIqXMuukJdXaIoVEpgYejHMKnAWYN7oV_eXzbxnF_B-WG&s",
    color: "rgb(77, 200, 91)",
  },
  {
    name: "reggaeton",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScoWJ8xDc3FatyFK2jkrN1cLcOLrHC0XpKKWzHZCmRotoAdYY&s",
    color: "rgb(246, 205, 37)",
  },
  {
    name: "rock",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuSFKzQ4Owj0OFBM-jHN9tHRV7tN-aAv8jA1HJebzsaNcirU&s",
    color: "rgb(55.308369445276256, 91.55180751378069, 60.224589084505276)",
  },
  {
    name: "rock-n-roll",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRoFgITzZK0XIv9fMckp0Uuyjvl3tMHlXldtq_VFpO-x9bmA&s",
    color: "rgb(254.76709594888092, 106.46189018214295, 78.41930613096491)",
  },
  {
    name: "rockabilly",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1skxI5UxeARmhDdO_5Nknrt_jCfWo1tXPQLz6kZWuXmD3FmA&s",
    color: "rgb(81.1562924826548, 134.20653224242756, 45.215141138213916)",
  },
  {
    name: "romance",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDR2PtgnIYxVPKh756JZLTqn6eXcZXDIraWcvehyPxP_nisLU&s",
    color: "rgb(247.96708221600778, 191.45101545701667, 66.05558444967207)",
  },
  {
    name: "sad",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4fCf29FltklBpzXCxpDRbRrr-SvygkZFrBdrpfWcNkJ2pNff&s",
    color: "rgb(179.09944928990808, 188.39559342683907, 90.3495554955481)",
  },
  {
    name: "salsa",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj8qho8KtcijTm885FieA2UCw9DBoFqmhF9tgwyHd77tOkRmo&s",
    color: "rgb(147.9843069164829, 11, 81.9974471306264)",
  },
  {
    name: "samba",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUkEB9TmZVI8zkXXP1noodDA6US5SyGoj3sNGz0j34hnqd58Q&s",
    color: "rgb(1, 11,60.11401311867327)",
  },
  {
    name: "sertanejo",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLw3FxEklnKi9Lb-G8sMcVwQ9NbZjqdJrTv_KC1QNeAZSfTw&s",
    color: "rgb(137.22177678506773, 142.8685823507015, 85.38565370631261)",
  },
  {
    name: "show-tunes",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRRl5OqkqDEszutDgt9CcpQSdQI5PYXu16XdqnX5t1UnBLPlIn&s",
    color: "rgb(241.33521986029987, 153.24105865314, 249.14553462678947)",
  },
  {
    name: "singer-songwriter",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HCob4rQWLhrS7KeGqLS-C1atEYLXXSZvOVstihzo85qL01E&s",
    color: "rgb(23.17222252305204, 156.27232112951882, 2.5873734579512755)",
  },
  {
    name: "ska",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk98z0fkaa8Iqr_bZD8XMcc_-cZNuUkNiUA4cpHa5woMKBgnYx&s",
    color: "rgb(215.27210687927348, 141.99465231862285, 90.94313607301014)",
  },
  {
    name: "sleep",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSFaGQbrzU3zHsxEbmnY8CYd2xaqEXiLjLayC3JDrw89PRlPo&s",
    color: "rgb(20.694925134994453, 111.03166269376408, 87.41209557830375)",
  },
  {
    name: "songwriter",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qk5HyxVlCDN8tQu1ExutntZFaWIoCcto5SOyEwJhgNYlTSw&s",
    color: "rgb(205.64985477834622, 128.25076792350282, 114.31365075455122)",
  },
  {
    name: "soul",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrY93NzuRqwSLsOw6cTiwJTteUkKj2dHbspGwuuWYwKjj4cQ&s",
    color: "rgb(224.38369246210237, 92.30107958455179, 12.741710118523159)",
  },
  {
    name: "soundtracks",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ90AwGGR1T_iDU2vJP1hAqoeYAkVrkQhXTH5sXfn3RQi0bbxv&s",
    color: "rgb(229.7250050972694, 210.38338018153203, 235.3801282639888)",
  },
  {
    name: "spanish",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKM76OyLDG_700q0Gi1pN8QkjzHl151WM0kiDMZ7FZ7LlmiP8&s",
    color: "rgb(49.8700956814142, 71.36917737135659, 227.43717793421675)",
  },
  {
    name: "study",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkP8CllekW0WPanFxgqYdhyt7r0fGRpl-EPU_zMwzmAqD2WVY&s",
    color: "rgb(107.30293863120541, 62.60883682454249, 236.6856735078601)",
  },
  {
    name: "summer",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx0eD_Q6FAgOKXk2NN_4xufFUu61H12GZtm-YE3lhqzMarw4dm&s",
    color: "rgb(20.781836934238562, 111.4378620186219, 242.50078450561853)",
  },
  {
    name: "swedish",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2KnWuCpl0TIWvlcyPw8Ku0D3xc9kgd3K-TSDKp7Pz-3DEcU&s",
    color: "rgb(237.31872256992133, 250.8722668529919, 176.87016234555904)",
  },
  {
    name: "synth-pop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrgCLqVrKB3wXWk-F65gwomlolvs5BxrSq3Pzh-wed-VMPZxzb&s",
    color: "rgb(207.2681057597104, 68.46248602245969, 73.97397065784006)",
  },
  {
    name: "tango",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzjMT0MPnaQ8MKMiKFN-iB3jCUBgjawQazYCQIhOCfsHLd-_q&s",
    color: "rgb(6.156609662466046, 117.71181638021669, 151.05560192480698)",
  },
  {
    name: "techno",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKXCZKSRTjVPuWzHTm2BMZfqDHHY_pb1LLIYLmEFRF6de89s&s",
    color: "rgb(13.427829976973845, 155.85182485976068, 13.26808580750573)",
  },
  {
    name: "trance",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXbGPu7ZuMcnj3NEj0k4XFczp_xn3uffZBY5o02ryq3qlnP_s&s",
    color: "rgb(224.1051711478938, 10.205037273988811, 163.04445661640676)",
  },
  {
    name: "trip-hop",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiStJBC1-YNBkaWuYJB4Krxwup6XG7H_1f0wQDJrKcm1DJiryf&s",
    color: "rgb(70.8517538310679, 153.28450092281156, 35.13060421205501)",
  },
  {
    name: "turkish",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8neRc8LhSVSg_CREylSqoACVrPVnnP2EUakD-sv_HJOwE4M&s",
    color: "rgb(54.82226264194833, 109.40046656336752, 24.57319810433428)",
  },
  {
    name: "work-out",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwWu2bMjmfT9nw9Euq-iViKvx10C91qbqZ_PWsFC6YB29NGuZ3&s",
    color: "rgb(29.43094516910002, 100.54075616190586, 159.23416135865045)",
  },
  {
    name: "world-music",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8h2jfs7kRNXlCaksMkxk7ZaHJxgBkcq4X4TmLEHRv-rXBYHs&s",
    color: "rgb(66.65480953043247, 187.66068057122556, 61.00435136886876)",
  },
];

function query() {
  const shuffledGenres = genres.sort(() => 0.5 - Math.random());
  return shuffledGenres;
}
