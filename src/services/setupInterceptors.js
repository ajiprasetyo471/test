import TokenService from "./token.service";

const excludedEndpoints = [
  "/auth/login",
  "/clients/create-password",
  "/forgot-password",
  "/reset-password",
];

const setup = (router) => {
  $axios.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalToken();
      const currentTime = Math.floor(Date.now() / 1000);

      if (!excludedEndpoints.includes(config.url)) {
        if (token) {
          config.headers["X-Bayarind-Access"] = token;
        }
        config.headers["X-Bayarind-Time"] = currentTime;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  $axios.interceptors.response.use(
    (res) => {
      // console.log(res?.data?.errors?.code);
      if (res?.data?.errors?.code == 403) {
        TokenService.removeAll();
        router.replace("/auth/login");
      }
      return res;
    },
    async (err) => {
      // Access Token was expired
      if (err.response.status === 401) {
        TokenService.removeAll();
        router.replace("/auth/login");
      }

      return Promise.reject(err);
    },
  );
};

export default setup;
