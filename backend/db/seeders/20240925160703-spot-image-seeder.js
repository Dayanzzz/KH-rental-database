'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema is defined in options object
}

// Cloudinary base URL
const cloudinaryBaseUrl = process.env.CLOUDINARY_BASE_URL;

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1front_rfnsko.jpg`, // Use Cloudinary URL
        preview: true
      },
      {
        spotId: 1,
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1ocean_bmkjxt.jpg`, // Use Cloudinary URL
        preview: false
      },
      {
        spotId: 1, 
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1bed_k2vbct.jpg`, // Use Cloudinary URL
        preview: false
      },
      {
        spotId: 1, 
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111325/curology-ycEKahEaO5U-unsplash_od34or.jpg`, // Use Cloudinary URL
        preview: false
      },
      {
        spotId: 1, 
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100584/1kitchen_garrz6.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100584/1kitchen_garrz6.jpg`, // Use Cloudinary URL
        preview: false
      },


      {
        spotId: 2,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111912/seiya-maeda-LvWKjThGQ4A-unsplash_nuzozr.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111912/seiya-maeda-LvWKjThGQ4A-unsplash_nuzozr.jpg`, // front-japan
        preview: true
      },
      {
        spotId: 2,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111957/yu-BLV9FXiw9lw-unsplash_sbgszj.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111957/yu-BLV9FXiw9lw-unsplash_sbgszj.jpg`, // kitchen-japan
        preview: false
      },
      {
        spotId: 2,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111923/manuel-cosentino-n--CMLApjfI-unsplash_mbqlad.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111923/manuel-cosentino-n--CMLApjfI-unsplash_mbqlad.jpg`, // view-japan
        preview: false
      },
      {
        spotId: 2,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111991/yosuke-ota-0R1GMsc2E7w-unsplash_sofk9y.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111991/yosuke-ota-0R1GMsc2E7w-unsplash_sofk9y.jpg`, // bedroom-japan
        preview: false
      },
      {
        spotId: 2,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111994/senad-palic-cLA7uKdkyks-unsplash_su9pbp.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111994/senad-palic-cLA7uKdkyks-unsplash_su9pbp.jpg`, // bathroom-japan
        preview: false
      },



      {
        spotId: 3,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112022/tolga-ahmetler-cnKlKYBlPLc-unsplash_wxg7wm.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112022/tolga-ahmetler-cnKlKYBlPLc-unsplash_wxg7wm.jpg`, // castle stay
        preview: true
      },
        
      {
        spotId: 3,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112037/chastity-cortijo-6TY_WrJTwSI-unsplash_v2wnyj.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112037/chastity-cortijo-6TY_WrJTwSI-unsplash_v2wnyj.jpg`, //castle bathroom
        preview: false
      },
        
      {
        spotId: 3,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112054/leandro-silva-sZuoTanK150-unsplash_nnv4z1.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112054/leandro-silva-sZuoTanK150-unsplash_nnv4z1.jpg`, // castle kitchen
        preview: false
      },
        
      {
        spotId: 3,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112095/dorian-mongel-WVN2nlgF93U-unsplash_colmth.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112095/dorian-mongel-WVN2nlgF93U-unsplash_colmth.jpg`, // castle living room
        preview: false
      },
        
      {
        spotId: 3,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112102/romain-galoche-EXbMAlPHHgQ-unsplash_nhczuq.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112102/romain-galoche-EXbMAlPHHgQ-unsplash_nhczuq.jpg`, // castle bedroom
        preview: false
      },




      {
        spotId: 4,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112228/andy-lin-XyEEBP5_pXI-unsplash_lkugcf.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112228/andy-lin-XyEEBP5_pXI-unsplash_lkugcf.jpg`, // napa front
        preview: true
      },
      {
        spotId: 4,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112208/tanya-guillory-oNQSQTdo3t4-unsplash_vjjjft.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112208/tanya-guillory-oNQSQTdo3t4-unsplash_vjjjft.jpg`, // napa viewnpm
        preview: false
      },
      {
        spotId: 4,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112216/odiseo-castrejon-CX8ooha2yLA-unsplash_wd3s9e.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112216/odiseo-castrejon-CX8ooha2yLA-unsplash_wd3s9e.jpg`, //  napa kitchen
        preview: false
      },
      {
        spotId: 4,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112219/timothy-buck-psrloDbaZc8-unsplash_tf5xdm.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112219/timothy-buck-psrloDbaZc8-unsplash_tf5xdm.jpg`, //napa bedroom
        preview: false
      },
      {
        spotId: 4,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112231/99-films-48mTwDzizqE-unsplash_bbvypi.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112231/99-films-48mTwDzizqE-unsplash_bbvypi.jpg`, //napa bathroom 
        preview: false
      },


      {
        spotId: 5,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112288/ka-t-dVO97Vbf2qk-unsplash_yxu3as.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112288/ka-t-dVO97Vbf2qk-unsplash_yxu3as.jpg`, // agrabah 
        preview: true
      },
      {
        spotId: 5,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112367/maria-orlova-b37mDyPzdJM-unsplash_cex72j.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112367/maria-orlova-b37mDyPzdJM-unsplash_cex72j.jpg`, // agrabah 
        preview: false
      },
      {
        spotId: 5,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112391/annie-spratt-435rouqxww4-unsplash_hjtx0g.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112391/annie-spratt-435rouqxww4-unsplash_hjtx0g.jpg`, //agrabah
        preview: false
      },
      {
        spotId: 5,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112410/annie-spratt-4Jk8hFM-JGk-unsplash_n33s9r.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112410/annie-spratt-4Jk8hFM-JGk-unsplash_n33s9r.jpg`, // agrabah
        preview: false
      },
      {
        spotId: 5,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112697/aaron-huber-CMejBwGAdGk-unsplash_dmy8ro.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112697/aaron-huber-CMejBwGAdGk-unsplash_dmy8ro.jpg`, // agrabah
        preview: false
      },



      {
        spotId: 6,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112616/jared-rice-ao1ZaY55bvs-unsplash_qffaib.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112616/jared-rice-ao1ZaY55bvs-unsplash_qffaib.jpg`, //beach
        preview: true
      },
      {
        spotId: 6,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112598/sergi-ferrete-q6E_JD4Z77w-unsplash_mbfoda.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112598/sergi-ferrete-q6E_JD4Z77w-unsplash_mbfoda.jpg`, //beach
        preview: false
      },
      {
        spotId: 6,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112622/andriyko-podilnyk-bdmdX_XMcV4-unsplash_cvtluh.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112622/andriyko-podilnyk-bdmdX_XMcV4-unsplash_cvtluh.jpg`, // beach
        preview: false
      },
      {
        spotId: 6,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112767/phil-hearing-U7PitHRnTNU-unsplash_gtzzun.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112767/phil-hearing-U7PitHRnTNU-unsplash_gtzzun.jpg`, // beach
        preview: false
      },
      {
        spotId: 6,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112772/hutomo-abrianto-LT0_qOWaM1k-unsplash_v9raty.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112772/hutomo-abrianto-LT0_qOWaM1k-unsplash_v9raty.jpg`, // beach
        preview: false
      },
     



      {
        spotId: 7,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112876/roberto-nickson-dc0leu1QSFA-unsplash_kdpfq9.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112876/roberto-nickson-dc0leu1QSFA-unsplash_kdpfq9.jpg`, // lodge
        preview: true
      },
      {
        spotId: 7,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112866/nine-koepfer-OZiflZqq0N0-unsplash_rwooj2.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112866/nine-koepfer-OZiflZqq0N0-unsplash_rwooj2.jpg`, // lodge bed
        preview: false
      },
      {
        spotId: 7,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112880/radek-grzybowski-1Ttpg_FDKXk-unsplash_wp0rjv.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112880/radek-grzybowski-1Ttpg_FDKXk-unsplash_wp0rjv.jpg`, // lodge kitchen
      },
      {
        spotId: 7,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113006/tina-witherspoon-q6i0SY68BVA-unsplash_sjrdr9.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113006/tina-witherspoon-q6i0SY68BVA-unsplash_sjrdr9.jpg`, // lodge bath
        preview: false
      },
      {
        spotId: 7,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112921/casey-horner-9HyVwpOOSBI-unsplash_nl2nbv.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112921/casey-horner-9HyVwpOOSBI-unsplash_nl2nbv.jpg`, // views
        preview: false
      },


      {
        spotId: 8,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113235/tania-orozco-qXgbYjcBJHc-unsplash_lriqpx.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113235/tania-orozco-qXgbYjcBJHc-unsplash_lriqpx.jpg`, // new mexico front
        preview: true
      },
      {
        spotId: 8,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113180/amira-aboalnaga-O7WjrXiKy_s-unsplash_h4dhcl.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113180/amira-aboalnaga-O7WjrXiKy_s-unsplash_h4dhcl.jpg`, // new mexico bathroom
        preview: false
      },
      {
        spotId: 8,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113190/aaron-huber-G7sE2S4Lab4-unsplash_thqeyd.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113190/aaron-huber-G7sE2S4Lab4-unsplash_thqeyd.jpg`, // new mexico kitchen
      },
      {
        spotId: 8,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113192/cody-doherty-AeqlmVWtzFA-unsplash_wznub5.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113192/cody-doherty-AeqlmVWtzFA-unsplash_wznub5.jpg`, // nm view
        preview: false
      },
      {
        spotId: 8,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113195/christopher-jolly-GqbU78bdJFM-unsplash_ez4a87.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113195/christopher-jolly-GqbU78bdJFM-unsplash_ez4a87.jpg`, // nm bedroom
        preview: false
      },


      {
        spotId: 9,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113291/mike-nguyen-t-4xEHYhr2g-unsplash_aphsjn.jpghttps://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113316/horizon-eye-d2FZKMgAtKQ-unsplash_zfzwg0.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113291/mike-nguyen-t-4xEHYhr2g-unsplash_aphsjn.jpg`, // greece front
        preview: true
      },
      {
        spotId: 9,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113295/patrick-boucher-6m8HABaoGr8-unsplash_annya0.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113295/patrick-boucher-6m8HABaoGr8-unsplash_annya0.jpg`, // greece view
        preview: false
      },
      {
        spotId: 9,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113302/brian-kyed-vJ9kq2_WcTU-unsplash_ecpdyp.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113302/brian-kyed-vJ9kq2_WcTU-unsplash_ecpdyp.jpg`, // greece rooftop
        preview: false
      },
      {
        spotId: 9,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113316/horizon-eye-d2FZKMgAtKQ-unsplash_zfzwg0.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113316/horizon-eye-d2FZKMgAtKQ-unsplash_zfzwg0.jpg`, //greece bathroom
        preview: false
      },
      {
        spotId: 9,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113318/rey-melvin-caraan-zH9slw2CQ-c-unsplash_b0eltk.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113318/rey-melvin-caraan-zH9slw2CQ-c-unsplash_b0eltk.jpg`, // greece kitchen
        preview: false
      },


      {
        spotId: 10,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113457/george-hiles-ZHF033ykCx8-unsplash_ukm1lb.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113457/george-hiles-ZHF033ykCx8-unsplash_ukm1lb.jpg`, // castle front
        preview: true
      },
      {
        spotId: 10,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113455/yosafat-herdian-yvZ-uEs8JZg-unsplash_jlshn2.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113455/yosafat-herdian-yvZ-uEs8JZg-unsplash_jlshn2.jpg`, // castle bathroom
        preview: false
      },
      {
        spotId: 10,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113456/kelly-sikkema-Wni6RtcNhU8-unsplash_dyg6n8.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113456/kelly-sikkema-Wni6RtcNhU8-unsplash_dyg6n8.jpg`, // castle hall
        preview: false
      },
      {
        spotId: 10,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113491/salem-dwO59BgFQpY-unsplash_zkyyyx.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113491/salem-dwO59BgFQpY-unsplash_zkyyyx.jpg`, // castle kitchen
        preview: false
      },
      {
        spotId: 10,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113493/annie-spratt-YROO1hljsIM-unsplash_z0o7qo.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113493/annie-spratt-YROO1hljsIM-unsplash_z0o7qo.jpg`, // castle bedropm
        preview: false
      },
      


      {
        spotId: 11,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113541/pascal-bernardon-BgaUEUaFF3w-unsplash_jvecsv.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113541/pascal-bernardon-BgaUEUaFF3w-unsplash_jvecsv.jpg`, // Ufrance front
        preview: true
      },
      {
        spotId: 11,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113533/tim-cooper-XfqGuWevmvs-unsplash_uscf6x.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113533/tim-cooper-XfqGuWevmvs-unsplash_uscf6x.jpg`, // france view
        preview: false
      },
      {
        spotId: 11,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113597/callum-hill-tuV9bTxn81A-unsplash_fybsk8.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113597/callum-hill-tuV9bTxn81A-unsplash_fybsk8.jpg`, // france kitchen
        preview: false
      },
      {
        spotId: 11,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113598/lotus-design-n-print-g51F6-WYzyU-unsplash_e81x0k.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113598/lotus-design-n-print-g51F6-WYzyU-unsplash_e81x0k.jpg`, // fracne bathroom
        preview: false
      },
      {
        spotId: 11,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113623/deconovo-evwisOtjgMg-unsplash_etkzsl.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113623/deconovo-evwisOtjgMg-unsplash_etkzsl.jpg`, // france bedroom 
        preview: false
      },


      {
        spotId: 12,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113719/khamkeo-DXTRyjAeA5E-unsplash_g2lhcb.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113719/khamkeo-DXTRyjAeA5E-unsplash_g2lhcb.jpg`, // iceland front
        preview: true
      },
      {
        spotId: 12,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112927/filios-sazeides-qeIuFR5vPm8-unsplash_mvy8mp.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112927/filios-sazeides-qeIuFR5vPm8-unsplash_mvy8mp.jpg`, //iceland bathroom
        preview: false
      },
      {
        spotId: 12,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113682/samuel-sascha-mayer-RTLFX-HCgjk-unsplash_t16js2.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113682/samuel-sascha-mayer-RTLFX-HCgjk-unsplash_t16js2.jpg`, // icealnd bedroom
        preview: false
      },
      {
        spotId: 12,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113687/nora-jane-long-c48l9sNPvfo-unsplash_wtzjvp.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113687/nora-jane-long-c48l9sNPvfo-unsplash_wtzjvp.jpg`, // iceland kitchen
        preview: false
      },
      {
        spotId: 12,
        //https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113728/robert-lukeman-zNN6ubHmruI-unsplash_p2fbsg.jpg
        url: `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113728/robert-lukeman-zNN6ubHmruI-unsplash_p2fbsg.jpg`, // iceland views
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1ocean_bmkjxt.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1front_rfnsko.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100589/1bed_k2vbct.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111325/curology-ycEKahEaO5U-unsplash_od34or.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729100584/1kitchen_garrz6.jpg`, //end of spot1
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111912/seiya-maeda-LvWKjThGQ4A-unsplash_nuzozr.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111957/yu-BLV9FXiw9lw-unsplash_sbgszj.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111923/manuel-cosentino-n--CMLApjfI-unsplash_mbqlad.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111991/yosuke-ota-0R1GMsc2E7w-unsplash_sofk9y.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729111994/senad-palic-cLA7uKdkyks-unsplash_su9pbp.jpg`, //end of spot2
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112022/tolga-ahmetler-cnKlKYBlPLc-unsplash_wxg7wm.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112037/chastity-cortijo-6TY_WrJTwSI-unsplash_v2wnyj.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112054/leandro-silva-sZuoTanK150-unsplash_nnv4z1.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112095/dorian-mongel-WVN2nlgF93U-unsplash_colmth.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112102/romain-galoche-EXbMAlPHHgQ-unsplash_nhczuq.jpg`, //end spot3
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112228/andy-lin-XyEEBP5_pXI-unsplash_lkugcf.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112208/tanya-guillory-oNQSQTdo3t4-unsplash_vjjjft.jpg`,
         `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112216/odiseo-castrejon-CX8ooha2yLA-unsplash_wd3s9e.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112219/timothy-buck-psrloDbaZc8-unsplash_tf5xdm.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112231/99-films-48mTwDzizqE-unsplash_bbvypi.jpg`, //end spot4
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112288/ka-t-dVO97Vbf2qk-unsplash_yxu3as.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112367/maria-orlova-b37mDyPzdJM-unsplash_cex72j.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112391/annie-spratt-435rouqxww4-unsplash_hjtx0g.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112410/annie-spratt-4Jk8hFM-JGk-unsplash_n33s9r.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112697/aaron-huber-CMejBwGAdGk-unsplash_dmy8ro.jpg`, //end spot5
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112616/jared-rice-ao1ZaY55bvs-unsplash_qffaib.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112598/sergi-ferrete-q6E_JD4Z77w-unsplash_mbfoda.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112622/andriyko-podilnyk-bdmdX_XMcV4-unsplash_cvtluh.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112767/phil-hearing-U7PitHRnTNU-unsplash_gtzzun.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112772/hutomo-abrianto-LT0_qOWaM1k-unsplash_v9raty.jpg`,//end spot6
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112866/nine-koepfer-OZiflZqq0N0-unsplash_rwooj2.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112866/nine-koepfer-OZiflZqq0N0-unsplash_rwooj2.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112880/radek-grzybowski-1Ttpg_FDKXk-unsplash_wp0rjv.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113006/tina-witherspoon-q6i0SY68BVA-unsplash_sjrdr9.jpg`,
             `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112921/casey-horner-9HyVwpOOSBI-unsplash_nl2nbv.jpg`, // end spot 7
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113235/tania-orozco-qXgbYjcBJHc-unsplash_lriqpx.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113180/amira-aboalnaga-O7WjrXiKy_s-unsplash_h4dhcl.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113190/aaron-huber-G7sE2S4Lab4-unsplash_thqeyd.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113192/cody-doherty-AeqlmVWtzFA-unsplash_wznub5.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113195/christopher-jolly-GqbU78bdJFM-unsplash_ez4a87.jpg`, //end spot8
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113291/mike-nguyen-t-4xEHYhr2g-unsplash_aphsjn.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113295/patrick-boucher-6m8HABaoGr8-unsplash_annya0.jpg`,
            `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113302/brian-kyed-vJ9kq2_WcTU-unsplash_ecpdyp.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113316/horizon-eye-d2FZKMgAtKQ-unsplash_zfzwg0.jpg`,
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113318/rey-melvin-caraan-zH9slw2CQ-c-unsplash_b0eltk.jpg`, //end spot9
           `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113457/george-hiles-ZHF033ykCx8-unsplash_ukm1lb.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113455/yosafat-herdian-yvZ-uEs8JZg-unsplash_jlshn2.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113456/kelly-sikkema-Wni6RtcNhU8-unsplash_dyg6n8.jpg`, 
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113491/salem-dwO59BgFQpY-unsplash_zkyyyx.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113493/annie-spratt-YROO1hljsIM-unsplash_z0o7qo.jpg`, //end 10 
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113541/pascal-bernardon-BgaUEUaFF3w-unsplash_jvecsv.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113533/tim-cooper-XfqGuWevmvs-unsplash_uscf6x.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113597/callum-hill-tuV9bTxn81A-unsplash_fybsk8.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113598/lotus-design-n-print-g51F6-WYzyU-unsplash_e81x0k.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113623/deconovo-evwisOtjgMg-unsplash_etkzsl.jpg`, //end spot11
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113719/khamkeo-DXTRyjAeA5E-unsplash_g2lhcb.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729112927/filios-sazeides-qeIuFR5vPm8-unsplash_mvy8mp.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113682/samuel-sascha-mayer-RTLFX-HCgjk-unsplash_t16js2.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113687/nora-jane-long-c48l9sNPvfo-unsplash_wtzjvp.jpg`,
          `https://res.cloudinary.com/dxdv1ejlq/image/upload/v1729113728/robert-lukeman-zNN6ubHmruI-unsplash_p2fbsg.jpg`




        ]
      }
    }, {});
  }
};
