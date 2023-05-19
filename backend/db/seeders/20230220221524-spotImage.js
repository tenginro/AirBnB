"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "SpotImages";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://as2.ftcdn.net/v2/jpg/02/70/32/33/1000_F_270323323_5Ja2zrAB2ccgXU3ayrCeQR2B9hiLtruo.jpg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://as2.ftcdn.net/v2/jpg/02/65/25/33/1000_F_265253326_1EYwBjse9bUfw2BrL7KQVp4W8E4I2dgt.jpg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://as1.ftcdn.net/v2/jpg/02/67/92/64/1000_F_267926436_SoQdCNoCU5X9ckhJvN90iNyV7B7SBwcT.jpg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://as1.ftcdn.net/v2/jpg/02/67/92/64/1000_F_267926476_3Rydy7PC6FlK46I54a6q3QHmClidG0zA.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://as1.ftcdn.net/v2/jpg/01/23/02/76/1000_F_123027671_mNppzNyqFxkkUUGAYjV1RTwZe8lIkVXM.jpg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://as2.ftcdn.net/v2/jpg/01/31/22/71/1000_F_131227117_oS5qcGDc7OESu4E3BFjm539EdtBd5ldk.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://as2.ftcdn.net/v2/jpg/01/33/87/01/1000_F_133870167_NWnnDcXnPj7gbhnbXi8tacE7CMWCmLHz.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://as1.ftcdn.net/v2/jpg/01/34/94/70/1000_F_134947037_lnS48VpcQnlDFSQHDibGsOmS3dKZbb7D.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://as1.ftcdn.net/v2/jpg/01/65/24/70/1000_F_165247064_mNkGye0s2fpoC1D0AaUErj9henDvnNsQ.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://as1.ftcdn.net/v2/jpg/05/67/22/00/1000_F_567220083_R1eTk65MeDV2FTRTZFHOcVjOYhyYtF2T.jpg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://as2.ftcdn.net/v2/jpg/05/67/22/23/1000_F_567222362_B1LQDsWqUKFoivEyLkcihzClmtnbqziI.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://as1.ftcdn.net/v2/jpg/05/67/22/00/1000_F_567220023_NqjsbXpcVzqXl5Q5UrzbKoADER5hVRv7.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://as1.ftcdn.net/v2/jpg/05/67/19/14/1000_F_567191400_UJuPyk8TBhZGiVh7RfNXarfkhGDdgVcK.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://as2.ftcdn.net/v2/jpg/05/67/20/79/1000_F_567207943_0N74jT7JsXXydjQvCY0CqngIfRs3cWqE.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://as1.ftcdn.net/v2/jpg/00/62/13/24/1000_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://as2.ftcdn.net/v2/jpg/00/62/45/07/1000_F_62450736_FuqI4Ci35NxZegKV2lZFgDhG7jqgJC1P.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://as1.ftcdn.net/v2/jpg/00/62/74/58/1000_F_62745820_07Ga0z8lnxHQnr3TKGRMjTfQJlU6Y8jP.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://as2.ftcdn.net/v2/jpg/00/63/40/07/1000_F_63400792_C8VBfUUJifcYSyRo9SOFabUDmpB1fk3h.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://as1.ftcdn.net/v2/jpg/00/62/74/58/1000_F_62745820_07Ga0z8lnxHQnr3TKGRMjTfQJlU6Y8jP.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://as2.ftcdn.net/v2/jpg/02/09/12/47/1000_F_209124760_sEIPfgAurKyrJMIUmdg2cLyiDdxZ8dBr.jpg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://as2.ftcdn.net/v2/jpg/02/09/12/47/1000_F_209124756_OQZUOTTFGBfygAGE5qzRzgRR5IHVq4y4.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://as2.ftcdn.net/v2/jpg/02/13/52/05/1000_F_213520584_03j0i0DLNze7tCMvhnl6XOJfUei1mNud.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://as1.ftcdn.net/v2/jpg/02/11/90/50/1000_F_211905099_dz6z2p1uoCM6jpw8fSDTwe00dg5HxheQ.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://as2.ftcdn.net/v2/jpg/02/13/52/05/1000_F_213520584_03j0i0DLNze7tCMvhnl6XOJfUei1mNud.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://as2.ftcdn.net/v2/jpg/00/94/68/29/1000_F_94682947_mbx9YUIOPBzUhGlol1vPYelu9K7NGtHt.jpg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://as1.ftcdn.net/v2/jpg/00/94/68/28/1000_F_94682890_mqvtjjP846NYYn4k4SJLSQdgnt4N50fi.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://as1.ftcdn.net/v2/jpg/00/94/68/28/1000_F_94682824_0zTXhirY7fFHolmnVuXfzh0IxfArecwV.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://as2.ftcdn.net/v2/jpg/02/28/59/31/1000_F_228593165_wCx7RpoM1W8skoyRn2A5Mj9lkhmTV0XH.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://as1.ftcdn.net/v2/jpg/02/20/21/72/1000_F_220217207_3COLu1o1nUOa5vj8dudK0Wl9yqjswF9q.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://as1.ftcdn.net/v2/jpg/03/00/09/64/1000_F_300096493_Hgs1oPI84kNjJlz6Ukwh1kEV09pZOMgW.jpg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://as2.ftcdn.net/v2/jpg/01/91/79/53/1000_F_191795318_noLCVbjZ6guIXiY3Go132103bfGMG9ht.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://as1.ftcdn.net/v2/jpg/01/90/85/00/1000_F_190850004_57CMU1l8zBKPmdJ2riZyTFYxXL27orij.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://as2.ftcdn.net/v2/jpg/04/69/05/97/1000_F_469059755_bACh9N70GoisVhj8xNrJbaCLTPk21eKE.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://as1.ftcdn.net/v2/jpg/03/97/30/82/1000_F_397308200_8PPV0hmGTphENrgADrulphwv3c0UtYAs.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://as2.ftcdn.net/v2/jpg/01/86/37/31/1000_F_186373174_7AaAW1Zkn3UEv1R19RcYfjdsnMJN2Vo0.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://as1.ftcdn.net/v2/jpg/03/89/32/38/1000_F_389323842_Qw4CUMPe0byxHsvc19jvrt6EVv0dtEX9.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://as1.ftcdn.net/v2/jpg/00/52/67/50/1000_F_52675042_eVXTMyX0w45rjc2mVdyyg1h7lLr1nhLI.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://as2.ftcdn.net/v2/jpg/00/47/16/39/1000_F_47163934_vanJ6U5xVNn9929pbtYUBL1DC3gnyHlj.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://as1.ftcdn.net/v2/jpg/01/79/58/68/1000_F_179586897_rUjze8jZbBvHdBJRMjbPd3ZrnXjO9nJr.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://as2.ftcdn.net/v2/jpg/03/36/42/37/1000_F_336423748_xSknja5E2wZIM9MZRFncNhJtsM86P0lD.jpg",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://as2.ftcdn.net/v2/jpg/04/93/50/97/1000_F_493509774_DXTnDiIXsimZsjlHrmd9WycCAiRtgOWv.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://as2.ftcdn.net/v2/jpg/01/30/86/77/1000_F_130867739_1lBYFDc02AURKylNFJRiLvuNNBcrT5yK.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://as2.ftcdn.net/v2/jpg/02/65/38/71/1000_F_265387117_F2oYtJSROKWa3dcYdUqd2qPGK04M2bf7.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://as2.ftcdn.net/v2/jpg/04/32/02/71/1000_F_432027120_VnkfH2yNgp6fDdQvnfE7xEsUyoLQQSql.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://as1.ftcdn.net/v2/jpg/05/90/99/70/1000_F_590997039_UMB1A15qyV8VccvkgHThXNg5pWzRKe98.jpg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://as1.ftcdn.net/v2/jpg/05/90/99/70/1000_F_590997029_rrmtwaSBuMBot8jXKaUx2rn44z29gkxu.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://as1.ftcdn.net/v2/jpg/05/86/10/88/1000_F_586108861_VtNNZhBCA65K4gLBwe7196FRtoOU3FkO.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://as1.ftcdn.net/v2/jpg/05/86/10/88/1000_F_586108844_vda80cXFOX9LSlCwy36YCyjUNNO0brHZ.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://as1.ftcdn.net/v2/jpg/05/86/10/68/1000_F_586106863_82D9wryjY0t3s33FpgPOvqzlCYtXNgLh.jpg",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/70/32/33/1000_F_270323323_5Ja2zrAB2ccgXU3ayrCeQR2B9hiLtruo.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/65/25/33/1000_F_265253326_1EYwBjse9bUfw2BrL7KQVp4W8E4I2dgt.jpg",
            "https://as1.ftcdn.net/v2/jpg/02/67/92/64/1000_F_267926436_SoQdCNoCU5X9ckhJvN90iNyV7B7SBwcT.jpg",
            "https://as1.ftcdn.net/v2/jpg/02/67/92/64/1000_F_267926476_3Rydy7PC6FlK46I54a6q3QHmClidG0zA.jpg",
            "https://as1.ftcdn.net/v2/jpg/01/23/02/76/1000_F_123027671_mNppzNyqFxkkUUGAYjV1RTwZe8lIkVXM.jpg",
            "https://as2.ftcdn.net/v2/jpg/01/31/22/71/1000_F_131227117_oS5qcGDc7OESu4E3BFjm539EdtBd5ldk.jpg",
            "https://as2.ftcdn.net/v2/jpg/01/33/87/01/1000_F_133870167_NWnnDcXnPj7gbhnbXi8tacE7CMWCmLHz.jpg",
            "https://as1.ftcdn.net/v2/jpg/01/34/94/70/1000_F_134947037_lnS48VpcQnlDFSQHDibGsOmS3dKZbb7D.jpg",
            "https://as1.ftcdn.net/v2/jpg/01/65/24/70/1000_F_165247064_mNkGye0s2fpoC1D0AaUErj9henDvnNsQ.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/67/22/00/1000_F_567220083_R1eTk65MeDV2FTRTZFHOcVjOYhyYtF2T.jpg",
            "https://as2.ftcdn.net/v2/jpg/05/67/22/23/1000_F_567222362_B1LQDsWqUKFoivEyLkcihzClmtnbqziI.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/67/22/00/1000_F_567220023_NqjsbXpcVzqXl5Q5UrzbKoADER5hVRv7.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/67/19/14/1000_F_567191400_UJuPyk8TBhZGiVh7RfNXarfkhGDdgVcK.jpg",
            "https://as2.ftcdn.net/v2/jpg/05/67/20/79/1000_F_567207943_0N74jT7JsXXydjQvCY0CqngIfRs3cWqE.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/62/13/24/1000_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg",
            "https://as2.ftcdn.net/v2/jpg/00/62/45/07/1000_F_62450736_FuqI4Ci35NxZegKV2lZFgDhG7jqgJC1P.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/62/74/58/1000_F_62745820_07Ga0z8lnxHQnr3TKGRMjTfQJlU6Y8jP.jpg",
            "https://as2.ftcdn.net/v2/jpg/00/63/40/07/1000_F_63400792_C8VBfUUJifcYSyRo9SOFabUDmpB1fk3h.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/62/74/58/1000_F_62745820_07Ga0z8lnxHQnr3TKGRMjTfQJlU6Y8jP.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/09/12/47/1000_F_209124760_sEIPfgAurKyrJMIUmdg2cLyiDdxZ8dBr.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/09/12/47/1000_F_209124756_OQZUOTTFGBfygAGE5qzRzgRR5IHVq4y4.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/13/52/05/1000_F_213520584_03j0i0DLNze7tCMvhnl6XOJfUei1mNud.jpg",
            "https://as1.ftcdn.net/v2/jpg/02/11/90/50/1000_F_211905099_dz6z2p1uoCM6jpw8fSDTwe00dg5HxheQ.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/13/52/05/1000_F_213520584_03j0i0DLNze7tCMvhnl6XOJfUei1mNud.jpg",
            "https://as2.ftcdn.net/v2/jpg/00/94/68/29/1000_F_94682947_mbx9YUIOPBzUhGlol1vPYelu9K7NGtHt.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/94/68/28/1000_F_94682890_mqvtjjP846NYYn4k4SJLSQdgnt4N50fi.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/94/68/28/1000_F_94682824_0zTXhirY7fFHolmnVuXfzh0IxfArecwV.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/28/59/31/1000_F_228593165_wCx7RpoM1W8skoyRn2A5Mj9lkhmTV0XH.jpg",
            "https://as1.ftcdn.net/v2/jpg/02/20/21/72/1000_F_220217207_3COLu1o1nUOa5vj8dudK0Wl9yqjswF9q.jpg",
            "https://as1.ftcdn.net/v2/jpg/03/00/09/64/1000_F_300096493_Hgs1oPI84kNjJlz6Ukwh1kEV09pZOMgW.jpg",
            "https://as2.ftcdn.net/v2/jpg/01/91/79/53/1000_F_191795318_noLCVbjZ6guIXiY3Go132103bfGMG9ht.jpg",
            "https://as1.ftcdn.net/v2/jpg/01/90/85/00/1000_F_190850004_57CMU1l8zBKPmdJ2riZyTFYxXL27orij.jpg",
            "https://as2.ftcdn.net/v2/jpg/04/69/05/97/1000_F_469059755_bACh9N70GoisVhj8xNrJbaCLTPk21eKE.jpg",
            "https://as1.ftcdn.net/v2/jpg/03/97/30/82/1000_F_397308200_8PPV0hmGTphENrgADrulphwv3c0UtYAs.jpg",
            "https://a0.muscache.com/im/pictures/miso/Hosting-683194252577702880/original/c3cc9e96-c34d-42db-9ffe-c5d2b0738f7e.jpeg",
            "https://as2.ftcdn.net/v2/jpg/01/86/37/31/1000_F_186373174_7AaAW1Zkn3UEv1R19RcYfjdsnMJN2Vo0.jpg",
            "https://as1.ftcdn.net/v2/jpg/03/89/32/38/1000_F_389323842_Qw4CUMPe0byxHsvc19jvrt6EVv0dtEX9.jpg",
            "https://as1.ftcdn.net/v2/jpg/00/52/67/50/1000_F_52675042_eVXTMyX0w45rjc2mVdyyg1h7lLr1nhLI.jpg",
            "https://as2.ftcdn.net/v2/jpg/00/47/16/39/1000_F_47163934_vanJ6U5xVNn9929pbtYUBL1DC3gnyHlj.jpg",
            "https://as1.ftcdn.net/v2/jpg/01/79/58/68/1000_F_179586897_rUjze8jZbBvHdBJRMjbPd3ZrnXjO9nJr.jpg",
            "https://as2.ftcdn.net/v2/jpg/03/36/42/37/1000_F_336423748_xSknja5E2wZIM9MZRFncNhJtsM86P0lD.jpg",
            "https://as2.ftcdn.net/v2/jpg/04/93/50/97/1000_F_493509774_DXTnDiIXsimZsjlHrmd9WycCAiRtgOWv.jpg",
            "https://as2.ftcdn.net/v2/jpg/01/30/86/77/1000_F_130867739_1lBYFDc02AURKylNFJRiLvuNNBcrT5yK.jpg",
            "https://as2.ftcdn.net/v2/jpg/02/65/38/71/1000_F_265387117_F2oYtJSROKWa3dcYdUqd2qPGK04M2bf7.jpg",
            "https://as2.ftcdn.net/v2/jpg/04/32/02/71/1000_F_432027120_VnkfH2yNgp6fDdQvnfE7xEsUyoLQQSql.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/90/99/70/1000_F_590997039_UMB1A15qyV8VccvkgHThXNg5pWzRKe98.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/90/99/70/1000_F_590997029_rrmtwaSBuMBot8jXKaUx2rn44z29gkxu.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/86/10/88/1000_F_586108844_vda80cXFOX9LSlCwy36YCyjUNNO0brHZ.jpg",
            "https://as1.ftcdn.net/v2/jpg/05/86/10/68/1000_F_586106863_82D9wryjY0t3s33FpgPOvqzlCYtXNgLh.jpg",
          ],
        },
      },
      {}
    );
  },
};
