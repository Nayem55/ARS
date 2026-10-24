# ARS Portfolio

The existing public-facing design lives in `ARS-frontend`; its content is now loaded from the API and can be maintained at `/admin`.

## Start locally

1. Make sure MongoDB is running locally.
2. In `ARS-Backend`, optionally copy `.env.example` to `.env`, then run `npm start`.
3. In `ARS-frontend`, optionally copy `.env.example` to `.env`, then run `npm run dev`.
4. Open the Vite URL and visit `/admin`.

The API uses `mongodb://127.0.0.1:27017/ars-portfolio` by default. Its first start seeds the supplied site data and creates the initial administrator account: `admin` / `admin123`. Change this password before production use.

The admin panel manages company details, navigation, filters/categories, industries, capabilities, products, product visibility, ordering and uploaded images. Uploaded files are saved to `ARS-Backend/uploads`.
