# Jeopardy

Lag ditt eget Jeopardy-brett og spill det på storskjerm med mobilen som fjernkontroll. Alt på norsk.

## Slik fungerer det

1. **Lag et brett** på `/ny`. Velg antall kategorier og rader, skriv spørsmål og svar som tekst, bilde eller begge. Du får en redigeringslenke med en nøkkel; den er det eneste som gir redigeringstilgang, så ta vare på den.
2. **Start et spill** fra brettet. Spillet får en romkode på fire bokstaver og åpnes på `/spill/KODE`. Vis den siden i fullskjerm på PC-en som er koblet til TV-en (trykk `F`).
3. **Skann QR-koden** øverst til høyre med mobilen, eller gå til `/koble-til` og skriv koden. Fjernkontrollen velger spørsmål, viser svar og gir poeng. Skjermen oppdateres umiddelbart.

Brettet kan også styres direkte på PC-en: klikk på en rute, `Enter`/mellomrom viser svar og lukker, `Esc` lukker, `U` angrer siste poeng, `Q` viser QR-koden stort.

## Teknisk

- Next.js (App Router) på Vercel
- Supabase: Postgres for brett og spill, Storage for bilder, Realtime Broadcast for synk mellom mobil og skjerm (med polling som reserve)
- Ingen innlogging. Brett eies via en hemmelig redigeringsnøkkel. All databasetilgang går gjennom server actions med service role-nøkkelen; nettleseren bruker kun anon-nøkkelen til Realtime og bildeopplasting med signerte URL-er.

## Oppsett

1. Lag et Supabase-prosjekt og kjør `supabase/migrations/0001_init.sql` i SQL-editoren.
2. Kopier `.env.example` til `.env.local` og fyll inn:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret key, kun på server)
3. `pnpm install && pnpm dev`

På Vercel legges de samme tre variablene inn under Environment Variables.
