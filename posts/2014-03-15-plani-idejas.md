---
layout: post
title: "Plāni. Idejas."
---

Ir dienas, kad darbs ir tīrā izklaide. Ir dienas, kad, jau pieceļoties no gultas, saproti, ka tava produktivitāte būs 0, un tad vēl ir tās dienas, kad, raujoties vaiga sviedros, nepietiks pat ar 8 h, lai paveiktu prasīto. Ir lieliski, ja visu nedēļu sanāk aizvadīt pirmajā režīmā, bet esmu ievērojis, ka "spriedzes" situācijās smadzenēm ir tieksme radīt visai vērtīgas idejas.

Nesen manā informācijas zelta bedrē iekrita saite uz ļoti interesantu statisko lapu ģeneratoru [Metalsmith](http://www.metalsmith.io "Metalsmith"). Tas pilnībā atšķiras no visiem pārējiem līdzīgiem rīkiem savas maksimālās, var pat teikt ekstrēmās, vienkāršības dēļ. Pašu par sevi to pat grūti nosaukt par statisko lapu ģeneratoru, jo iebūvētā funkcionalitāte, neveic neko vairāk kā ieejas datu (failu) parsēšanu uz JSON objektiem un padošanu tālāk uz izejas direktoriju. Ja mēs vēlamies, lai pa ceļam dati tiktu kaut kādā veidā pārveidoti, piemēram, no Markdown formāta uz HTML, tad mums šī procesa vidū ir jāiesprauž kāds papildus zobrats, kurš prastu panākt mums vēlamo rezultātu. Tieši šī spraudņu sistēma rada Metalsmith burvību, jo ar to ir iespējams paveikt vistrakākās lietas.

Līdz šim vienīgais statisko lapu ģenerators, kuram pievērsu lielu vērību, bija Jekyll. Tas ir vispopulārākais šāda veida risinājums, un, lai arī bieži saukts par hakeru satura vadības sistēmu, tomēr tīri labi piemērots arī cilvēkiem, kam ar aplikāciju izstrādi nekāda sakara nav. Kad izlasīju par Metalsmith, sapratu, ka diezgan ilgi esmu dzīvojies ar Jekyll un būtu vērts pamēģināt ko jaunu.

Kā jau minēju sākumā, darbs ir viltīga padarīšana. Vakar sanāca visai intensīvi labot visādas kļūdas projektos, pārtērējot dienas vidējo plānoto stundu skaitu, jo piektdiena un uz rītu atlikt nekā nevarēja, un šī procesa laikā, smadzenēm pamazām kūpot, galvā pavīdēja doma par to, ka varētu uz kādu laiciņu pārnest sava bloga rakstus uz Metalsmith. Skan visai man raksturīgi, un pēc taustiņu spiešanas maratona, iekrītot miega skavās, izplānoju, kā tas viss varētu notikt un ka tā nemaz nav slikta doma.

Vienīgā problēma šai sakarā ir Jekyll rakstu nesaderība ar Metalsmith. Problēma nosacīta, jo, raugoties no pozitīvās puses, tas man deva iespēju iemēģināt Metalsmith spraudņu izstrādes procesu. Kā izrādās, tas saglabā Metalsmith vienkāršību, tāpēc nepieciešamo spraudni uzdrukāju pus stundas laikā, un tagad atliek vien pabeigt pašu bloga struktūru.

Gadījumam, ja pasaulē ir vēl kāda dvēsele, kas nav ar prātu draugos un mēģinās pāriet no Jekyll uz Metalsmith, nolēmu publicēt šo spraudni iekš NPM, kā arī GitHub zem MIT licences. Par spraudņa nosaukuma variantiem biju apvaicājies Tviterī, un paldies visiem, kas deva ieteikumus, bet šorīt nolēmu to nodēvēt par [metalsmith-mallet](https://github.com/aigarsdz/metalsmith-mallet "aigarsdz/metalsmith-mallet"). Domāju, ka mallet ir visai atbilstošs apzīmējums.

### **tl;dr**

Tuvākās nedēļas laikā centīšos visu pabeigt, un, ja man patiks galarezultāts, tad aizstāšu Jekyll šim blogam ar Metalsmith. Ja nepatiks, tad vismaz būšu izveidojis jaunu atvērtā koda projektu, kas var noderēt kādam citam.

Stāsta morāle - diendusa ir svētīga lieta. Ja jūtat, ka uz vakaru smadzenes pārvērtīsies nelietojamā masā, aizmirstiet par 5-Hour Energy, kafiju un visiem tiem neizskaidrojami vienādajiem enerģijas dzērieniem pievilcīgajās skārdenēs. Neilga snauda restartēs jūsu sistēmu kā neviens.
