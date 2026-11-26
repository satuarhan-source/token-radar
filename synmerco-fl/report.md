# D1 Report — Florida for-hire carriers registered 20261101–20261114 (esc_e31eb2175387452f859eba7d)

## Executive summary

The screen covers 300 AUTHORIZED FOR HIRE Florida carriers with add_date 20261101–20261114 (raw filter count = 300), fixed by dot_number at pull 1 and re-checked in three pulls 24 hours apart. In the last pull, 287 carriers carry at least one flag; the most common flag is no authority docket (286 carriers), and 17 carriers carry two or more flags. Shared-address groups: 3 groups, 8 members.

## PROOF — raw filter count(*) excerpts (response body exactly as the source returned it, per pull)

PULL 1:
```json
[{"cnt":"300"}]
```

PULL 2:
```json
[{"cnt":"315"}]
```

PULL 3:
```json
[{"cnt":"317"}]
```

## Flag tallies (last good pull: PULL 3)

Carriers per flag:

| flag | carriers |
|---|---|
| shared address | 8 |
| mailing outside FL | 3 |
| no authority docket | 286 |
| authority not active | 0 |
| inactive | 6 |
| drivers missing | 2 |

Carriers with two or more flags: **17**

With two or more flags, by power_units band:

| flag | 0 or empty | 1 | 2 to 5 | 6 to 20 | 21 or more |
|---|---|---|---|---|---|
| shared address | 0 | 5 | 2 | 0 | 0 |
| mailing outside FL | 0 | 2 | 1 | 0 | 0 |
| no authority docket | 0 | 12 | 5 | 0 | 0 |
| authority not active | 0 | 0 | 0 | 0 | 0 |
| inactive | 0 | 5 | 1 | 0 | 0 |
| drivers missing | 0 | 1 | 1 | 0 | 0 |

## Shared-address groups (same phy_street and phy_zip; lowest dot_number first)


**G1** — phy_city ST PETERSBURG, phy_zip 33702-4399 — members: 4936327 (DEVOTIONAL LOGISTICS LLC), 5771787 (CT EXPRESS FREIGHT LLC), 6848013 (SUNSHINE FLEET EXPRESS LLC), 9637948 (SILENT SHEPHERD SOLUTIONS LLC)

**G2** — phy_city FT LAUDERDALE, phy_zip 33311-8002 — members: 5479308 (NICK 3 TRANSPORT AND MORE LLC), 8467984 (NICK 3 TRANSPORT AND MORE LLC)

**G3** — phy_city JACKSONVILLE, phy_zip 32219-1703 — members: 5906082 (ELCCTRANSPORT LLC), 9613423 (F.A.I. TRANSPORTATION LLC)

## Carriers with two or more flags

| dot_number | legal_name | flags | power_units |
|---|---|---|---|
| 4804567 | DIVINE ROADWAYS TRANSPORTATION LLC | mailing outside FL;no authority docket | 1 |
| 4936327 | DEVOTIONAL LOGISTICS LLC | shared address;no authority docket | 1 |
| 4963914 | SOSA TRUCK LLC | no authority docket;inactive | 2 |
| 5479308 | NICK 3 TRANSPORT AND MORE LLC | shared address;no authority docket | 1 |
| 5771787 | CT EXPRESS FREIGHT LLC | shared address;no authority docket | 1 |
| 5906082 | ELCCTRANSPORT LLC | shared address;no authority docket | 2 |
| 6004539 | DALEY'S ALL PURPOSE LOGISTICS LLC | no authority docket;inactive | 1 |
| 6848013 | SUNSHINE FLEET EXPRESS LLC | shared address;no authority docket | 1 |
| 7376921 | BIG MURV LLC | mailing outside FL;no authority docket | 2 |
| 8074849 | AMEG LOGISTICS LLC | no authority docket;inactive | 1 |
| 8162856 | OCC CARRIER LLC | no authority docket;inactive | 1 |
| 8304489 | JOHNSON PREMIER GROUP LLC | no authority docket;inactive | 1 |
| 8467984 | NICK 3 TRANSPORT AND MORE LLC | shared address;no authority docket | 1 |
| 8533210 | TRUE BEARING LOGISTICS | mailing outside FL;no authority docket;drivers missing | 1 |
| 9335915 | CONTRACT SERVICES OF NORTH FLORIDA, INC. | no authority docket;inactive | 1 |
| 9637948 | SILENT SHEPHERD SOLUTIONS LLC | shared address;no authority docket | 3 |
| 9721463 | LEGENDARIO TOWING LLC | no authority docket;drivers missing | 2 |

## Changes: PULL 2 vs PULL 1

Counts: new = 15, gone = 0, changed = 21 keys (dot_numbers 4919967, 4988653, 5106584, 5122422, 5567120, 5946526, 5983399, 6004539, 6152806, 6252254, 6362883, 6971100, 7010140, 7143503, 7214117, 8282073, 9002865, 9248305, 9457581, 9541098, 9613423).

Row counts: PULL 1 = 300, PULL 2 = 315 (later = earlier + new − gone: 315 = 300 + 15 − 0).

New (key only in the later pull): 4740279, 4748191, 5344458, 6332981, 6365611, 7283450, 7506355, 8337193, 8571425, 8597491, 8914355, 8934577, 9106908, 9555949, 9591121

Gone (key only in the earlier pull): none

Changed (same key, a Changes column differs):

| dot_number | column | earlier | later |
|---|---|---|---|
| 4919967 | docket1prefix |  | MC |
| 4919967 | docket1 |  | 64528761 |
| 4919967 | docket1_status_code |  | A |
| 4919967 | flags | no authority docket |  |
| 4988653 | docket1prefix |  | MC |
| 4988653 | docket1 |  | 51500441 |
| 4988653 | docket1_status_code |  | A |
| 4988653 | flags | no authority docket |  |
| 5106584 | docket1prefix |  | MC |
| 5106584 | docket1 |  | 79405234 |
| 5106584 | docket1_status_code |  | A |
| 5106584 | flags | no authority docket |  |
| 5122422 | docket1prefix |  | MC |
| 5122422 | docket1 |  | 57812377 |
| 5122422 | docket1_status_code |  | A |
| 5122422 | flags | no authority docket |  |
| 5567120 | docket1prefix |  | MC |
| 5567120 | docket1 |  | 55513687 |
| 5567120 | docket1_status_code |  | A |
| 5567120 | flags | no authority docket |  |
| 5946526 | docket1prefix |  | MC |
| 5946526 | docket1 |  | 91653138 |
| 5946526 | docket1_status_code |  | A |
| 5946526 | flags | no authority docket |  |
| 5983399 | docket1prefix |  | MC |
| 5983399 | docket1 |  | 50906072 |
| 5983399 | docket1_status_code |  | A |
| 5983399 | flags | no authority docket |  |
| 6004539 | status_code | A | P |
| 6004539 | flags | no authority docket | no authority docket;inactive |
| 6152806 | docket1prefix |  | MC |
| 6152806 | docket1 |  | 97018444 |
| 6152806 | docket1_status_code |  | A |
| 6152806 | flags | no authority docket |  |
| 6252254 | docket1prefix |  | MC |
| 6252254 | docket1 |  | 94544724 |
| 6252254 | docket1_status_code |  | A |
| 6252254 | flags | no authority docket |  |
| 6362883 | docket1prefix |  | MC |
| 6362883 | docket1 |  | 87267820 |
| 6362883 | docket1_status_code |  | A |
| 6362883 | flags | no authority docket |  |
| 6971100 | docket1prefix |  | MC |
| 6971100 | docket1 |  | 61697798 |
| 6971100 | docket1_status_code |  | A |
| 6971100 | flags | no authority docket |  |
| 7010140 | docket1prefix |  | MC |
| 7010140 | docket1 |  | 90210810 |
| 7010140 | docket1_status_code |  | A |
| 7010140 | flags | no authority docket |  |
| 7143503 | docket1prefix |  | MC |
| 7143503 | docket1 |  | 56478306 |
| 7143503 | docket1_status_code |  | A |
| 7143503 | flags | no authority docket |  |
| 7214117 | docket1prefix |  | MC |
| 7214117 | docket1 |  | 98611633 |
| 7214117 | docket1_status_code |  | A |
| 7214117 | flags | no authority docket |  |
| 8282073 | docket1prefix |  | MC |
| 8282073 | docket1 |  | 78242338 |
| 8282073 | docket1_status_code |  | A |
| 8282073 | flags | no authority docket |  |
| 9002865 | docket1prefix |  | MC |
| 9002865 | docket1 |  | 66576505 |
| 9002865 | docket1_status_code |  | A |
| 9002865 | flags | no authority docket |  |
| 9248305 | phy_city | CUTLER BAY | HOMESTEAD |
| 9248305 | phy_zip | 33189-3005 | 33032 |
| 9457581 | docket1prefix |  | MC |
| 9457581 | docket1 |  | 47443624 |
| 9457581 | docket1_status_code |  | A |
| 9457581 | flags | no authority docket |  |
| 9541098 | docket1prefix |  | MC |
| 9541098 | docket1 |  | 89844434 |
| 9541098 | docket1_status_code |  | A |
| 9541098 | flags | no authority docket |  |
| 9613423 | docket1prefix |  | MC |
| 9613423 | docket1 |  | 96187829 |
| 9613423 | docket1_status_code |  | A |
| 9613423 | flags | shared address;no authority docket | shared address |


## Changes: PULL 3 vs PULL 2

Counts: new = 2, gone = 0, changed = 2 keys (dot_numbers 6285058, 8150194).

Row counts: PULL 2 = 315, PULL 3 = 317 (later = earlier + new − gone: 317 = 315 + 2 − 0).

New (key only in the later pull): 7351971, 9234377

Gone (key only in the earlier pull): none

Changed (same key, a Changes column differs):

| dot_number | column | earlier | later |
|---|---|---|---|
| 6285058 | docket1prefix |  | MC |
| 6285058 | docket1 |  | 45194499 |
| 6285058 | docket1_status_code |  | A |
| 6285058 | flags | no authority docket |  |
| 8150194 | docket1prefix |  | MC |
| 8150194 | docket1 |  | 62698378 |
| 8150194 | docket1_status_code |  | A |
| 8150194 | flags | no authority docket |  |

## PROOF — request log and raw rows


### PULL 1

- `https://data.transportation.gov/resource/az4n-8mr2.json?%24select=count%28%2A%29+as+cnt&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27` — 2026-11-24T20:52:49Z UTC — HTTP 200
- `https://data.transportation.gov/resource/az4n-8mr2.json?%24limit=50000&%24offset=0&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27&%24order=dot_number&%24select=dot_number%2Clegal_name%2Cphy_street%2Cphy_city%2Cphy_zip%2Cadd_date%2Cstatus_code%2Cpower_units%2Ctotal_drivers%2Cdocket1prefix%2Cdocket1%2Cdocket1_status_code%2Ccarrier_mailing_state` — 2026-11-24T20:52:54Z UTC — HTTP 200
- First response Date header (source time): Tue, 24 Nov 2026 20:52:55 GMT
- count(*) response for this pull (raw body):

```json
[{"cnt":"300"}]
```


### PULL 2

- `https://data.transportation.gov/resource/az4n-8mr2.json?%24select=count%28%2A%29+as+cnt&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27` — 2026-11-25T21:04:51Z UTC — HTTP 200
- `https://data.transportation.gov/resource/az4n-8mr2.json?%24limit=50000&%24offset=0&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27&%24order=dot_number&%24select=dot_number%2Clegal_name%2Cphy_street%2Cphy_city%2Cphy_zip%2Cadd_date%2Cstatus_code%2Cpower_units%2Ctotal_drivers%2Cdocket1prefix%2Cdocket1%2Cdocket1_status_code%2Ccarrier_mailing_state` — 2026-11-25T21:04:52Z UTC — HTTP 200
- First response Date header (source time): Wed, 25 Nov 2026 21:04:53 GMT
- count(*) response for this pull (raw body):

```json
[{"cnt":"315"}]
```


### PULL 3

- `https://data.transportation.gov/resource/az4n-8mr2.json?%24select=count%28%2A%29+as+cnt&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27` — 2026-11-26T21:25:47Z UTC — HTTP 200
- `https://data.transportation.gov/resource/az4n-8mr2.json?%24limit=50000&%24offset=0&%24where=phy_state+%3D+%27FL%27+AND+classdef+%3D+%27AUTHORIZED+FOR+HIRE%27+AND+add_date+%3E%3D+%2720261101%27+AND+add_date+%3C%3D+%2720261114%27&%24order=dot_number&%24select=dot_number%2Clegal_name%2Cphy_street%2Cphy_city%2Cphy_zip%2Cadd_date%2Cstatus_code%2Cpower_units%2Ctotal_drivers%2Cdocket1prefix%2Cdocket1%2Cdocket1_status_code%2Ccarrier_mailing_state` — 2026-11-26T21:25:48Z UTC — HTTP 200
- First response Date header (source time): Thu, 26 Nov 2026 21:25:49 GMT
- count(*) response for this pull (raw body):

```json
[{"cnt":"317"}]
```


### Raw rows of every shared-address group member (last good pull)

```json
{"dot_number": "4936327", "legal_name": "DEVOTIONAL LOGISTICS LLC", "phy_street": "7901 4TH ST N STE 300", "phy_city": "ST PETERSBURG", "phy_zip": "33702-4399", "add_date": "20261113", "status_code": "A", "power_units": "1", "total_drivers": "1", "carrier_mailing_state": "FL"}
{"dot_number": "5479308", "legal_name": "NICK 3 TRANSPORT AND MORE LLC", "phy_street": "630 NW 12TH AVE", "phy_city": "FT LAUDERDALE", "phy_zip": "33311-8002", "add_date": "20261102", "status_code": "A", "power_units": "1", "total_drivers": "1", "carrier_mailing_state": "FL"}
{"dot_number": "5771787", "legal_name": "CT EXPRESS FREIGHT LLC", "phy_street": "7901 4TH ST N STE 300", "phy_city": "ST PETERSBURG", "phy_zip": "33702-4399", "add_date": "20261106", "status_code": "A", "power_units": "1", "total_drivers": "1", "carrier_mailing_state": "FL"}
{"dot_number": "5906082", "legal_name": "ELCCTRANSPORT LLC", "phy_street": "7651 WOODLEY RD", "phy_city": "JACKSONVILLE", "phy_zip": "32219-1703", "add_date": "20261113", "status_code": "A", "power_units": "2", "total_drivers": "2", "carrier_mailing_state": "FL"}
{"dot_number": "6848013", "legal_name": "SUNSHINE FLEET EXPRESS LLC", "phy_street": "7901 4TH ST N STE 300", "phy_city": "ST PETERSBURG", "phy_zip": "33702-4399", "add_date": "20261112", "status_code": "A", "power_units": "1", "total_drivers": "1", "carrier_mailing_state": "FL"}
{"dot_number": "8467984", "legal_name": "NICK 3 TRANSPORT AND MORE LLC", "phy_street": "630 NW 12TH AVE", "phy_city": "FORT LAUDERDALE", "phy_zip": "33311-8002", "add_date": "20261103", "status_code": "A", "power_units": "1", "total_drivers": "2", "carrier_mailing_state": "FL"}
{"dot_number": "9613423", "legal_name": "F.A.I. TRANSPORTATION LLC", "phy_street": "7651 WOODLEY RD", "phy_city": "JACKSONVILLE", "phy_zip": "32219-1703", "add_date": "20261107", "status_code": "A", "power_units": "1", "total_drivers": "1", "docket1prefix": "MC", "docket1": "96187829", "docket1_status_code": "A", "carrier_mailing_state": "FL"}
{"dot_number": "9637948", "legal_name": "SILENT SHEPHERD SOLUTIONS LLC", "phy_street": "7901 4TH ST N STE 300", "phy_city": "ST PETERSBURG", "phy_zip": "33702-4399", "add_date": "20261103", "status_code": "A", "power_units": "3", "total_drivers": "2", "carrier_mailing_state": "FL"}
```

