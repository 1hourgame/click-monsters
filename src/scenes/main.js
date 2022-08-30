import Phaser from "phaser";
/* Import these files from assets/monsters:
16618771647485839882598767864565.jpg	16618773628951889235671728983299.jpg	1661877659513706163635453033754.jpg
16618771993217494406815104586733.jpg	16618773726302354039477608963662.jpg	16618776705362083937394511612845.jpg
16618772153817747199024685602211.jpg	16618773865464052561023230338624.jpg	16618776825015555335872914323058.jpg
16618772378214204882142988961405.jpg	16618773965766896020193674879673.jpg	16618776935764124237396486361547.jpg
16618772496193162610171394947401.jpg	16618774137083356224619122186494.jpg	16618777055791499803971957771924.jpg
16618772621555865520523027856543.jpg	16618774266557706706835010746912.jpg	16618777156348074945055498629631.jpg
16618772737534676448906225247542.jpg	16618774372712284371815115878072.jpg	16618777254582291902669661006768.jpg
16618772863874372221458771099798.jpg	1661877448560659174685281118843.jpg	16618777352837067341930204535262.jpg
16618772972461936544816629947409.jpg	16618774588627035913094784738812.jpg	16618777456805325814620354756571.jpg
*/
import monster1 from "../assets/monsters/16618771647485839882598767864565.jpg";
import monster2 from "../assets/monsters/16618771993217494406815104586733.jpg";
import monster3 from "../assets/monsters/16618772153817747199024685602211.jpg";
import monster4 from "../assets/monsters/16618772378214204882142988961405.jpg";
import monster5 from "../assets/monsters/16618772496193162610171394947401.jpg";
import monster6 from "../assets/monsters/16618772621555865520523027856543.jpg";
import monster7 from "../assets/monsters/16618772737534676448906225247542.jpg";
import monster8 from "../assets/monsters/16618772863874372221458771099798.jpg";
import monster9 from "../assets/monsters/16618772972461936544816629947409.jpg";
import monster10 from "../assets/monsters/16618773628951889235671728983299.jpg";
import monster11 from "../assets/monsters/16618773726302354039477608963662.jpg";
import monster12 from "../assets/monsters/16618773865464052561023230338624.jpg";
import monster13 from "../assets/monsters/16618773965766896020193674879673.jpg";
import monster14 from "../assets/monsters/16618774137083356224619122186494.jpg";
import monster15 from "../assets/monsters/16618774266557706706835010746912.jpg";
import monster16 from "../assets/monsters/16618774372712284371815115878072.jpg";
import monster17 from "../assets/monsters/1661877448560659174685281118843.jpg";
import monster18 from "../assets/monsters/16618774588627035913094784738812.jpg";
import monster19 from "../assets/monsters/1661877659513706163635453033754.jpg";
import monster20 from "../assets/monsters/16618776705362083937394511612845.jpg";
import monster21 from "../assets/monsters/16618776825015555335872914323058.jpg";
import monster22 from "../assets/monsters/16618776935764124237396486361547.jpg";
import monster23 from "../assets/monsters/16618777055791499803971957771924.jpg";
import monster24 from "../assets/monsters/16618777156348074945055498629631.jpg";
import monster25 from "../assets/monsters/16618777254582291902669661006768.jpg";
import monster26 from "../assets/monsters/16618777352837067341930204535262.jpg";
import monster27 from "../assets/monsters/16618777456805325814620354756571.jpg";

const monsterImages = [
  monster1,
  monster2,
  monster3,
  monster4,
  monster5,
  monster6,
  monster7,
  monster8,
  monster9,
  monster10,
  monster11,
  monster12,
  monster13,
  monster14,
  monster15,
  monster16,
  monster17,
  monster18,
  monster19,
  monster20,
  monster21,
  monster22,
  monster23,
  monster24,
  monster25,
  monster26,
  monster27,
];

/* Monster names:
1. Fluffy
2. Snuggles
3. Cuddle Bug
4. Love Bug
5. Sweetie
6. Sugar
7. Spice
8. Pumpkin
9. Peanut
10. Jelly Bean
11. Giggles
12. Sunshine
13. Rainbow
14. Cupcake
15. Lollipop
16. Cookie
17. Honey
18. Cherry
19. Blueberry
20. Strawberry
21. Kiwi
22. Mango
23. Pineapple
24. Coconut
25. Banana
26. Watermelon
27. Grape
*/
const monsterNames = [
  "Fluffy",
  "Snuggles",
  "Cuddle Bug",
  "Love Bug",
  "Sweetie",
  "Sugar",
  "Spice",
  "Pumpkin",
  "Peanut",
  "Jelly Bean",
  "Giggles",
  "Sunshine",
  "Rainbow",
  "Cupcake",
  "Lollipop",
  "Cookie",
  "Honey",
  "Cherry",
  "Blueberry",
  "Strawberry",
  "Kiwi",
  "Mango",
  "Pineapple",
  "Coconut",
  "Banana",
  "Watermelon",
  "Grape",
];

const HP_BAR_WIDTH = 300;
const HP_BAR_HEIGHT = 10;
const HP_BAR_TOP = 20;

const NAME_TOP = 40;
const MONSTER_IMAGE_TOP = 190;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: true });
    this.monsterId = 0;

    this.maxHP = 100;
    this.currentHP = 100;

    // How much HP one click will damage
    this.damage = 13;
  }

  init(data) {}

  preload() {
    // Load monster images
    for (let i = 0; i < monsterImages.length; i++) {
      this.load.image(`monster${i}`, monsterImages[i]);
    }
  }

  create() {
    // Center of the screen based on the camera
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Display a white rectangle 5 pixels from the top of the screen
    // to show the HP bar
    this.add.rectangle(
      centerX,
      HP_BAR_TOP,
      HP_BAR_WIDTH + 2,
      HP_BAR_HEIGHT,
      0xffffff
    );
    this.hpBar = this.add.rectangle(
      centerX,
      HP_BAR_TOP,
      HP_BAR_WIDTH,
      HP_BAR_HEIGHT - 2,
      0x000000
    );

    // Locate current monster at the center of the screen
    this.monster = this.add.image(centerX, MONSTER_IMAGE_TOP, `monster${this.monsterId}`);
    // Add a click event to the monster
    this.monster.setInteractive();
    this.monster.on("pointerdown", () => {
      this.onMonsterClicked();
    });
    this.updateHPBar();

    // Display monster name
    this.monsterName = this.add.text(centerX, NAME_TOP, "", {
      fontSize: "20px",
      color: "#FFFFFF",
    });
    // set the origin to the center of the text
    this.monsterName.setOrigin(0.5, 0.5);
    this.updateMonster();
  }

  updateHPBar() {
    // Update HP bar
    const hp_percent = this.currentHP / this.maxHP;
    this.hpBar.width = hp_percent * HP_BAR_WIDTH;
  }

  updateMonster() {
    // Update monster image
    this.monster.setTexture(`monster${this.monsterId}`);
    // Update monster name
    this.monsterName.setText(monsterNames[this.monsterId]);
  }

  nextMonster() {
    // Update monster image
    this.monsterId++;
    if (this.monsterId >= monsterImages.length) {
      this.monsterId = 0;
    }
    this.updateMonster();
  }

  onMonsterClicked() {
    // Reduce HP
    this.currentHP -= this.damage;
    // if HP is below 0, increment monster id and reset HP
    if (this.currentHP <= 0) {
      this.nextMonster();
      this.currentHP = this.maxHP;
    }
    this.updateHPBar();
  }

  update() {}
}
