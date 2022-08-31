import Phaser from "phaser";
import { monsterImages, monsterNames } from "../constants/monsters";
import { weapons } from "../constants/weapons";

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

    this.currentWeapon = 0;
  }

  init(data) {}

  preload() {
    // Load monster images
    for (let i = 0; i < monsterImages.length; i++) {
      this.load.image(`monster${i}`, monsterImages[i]);
    }

    // Load weapon images
    for (let i = 0; i < weapons.length; i++) {
      this.load.image(`weapon${i}`, weapons[i].image);
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
    this.monster = this.add.image(
      centerX,
      MONSTER_IMAGE_TOP,
      `monster${this.monsterId}`
    );
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

    const currentWeaponImage = `weapon${this.currentWeapon}`;
    // Display current weapon image under the monster image
    this.weapon = this.add.image(
      centerX,
      MONSTER_IMAGE_TOP + 300,
      currentWeaponImage
    );
    // scale it to 50%
    this.weapon.setScale(0.5);
    // Draw weapon name under the weapon
    this.weaponName = this.add.text(
      centerX,
      MONSTER_IMAGE_TOP + 400,
      weapons[this.currentWeapon].name,
      {
        fontSize: "20px",
        color: "#FFFFFF",
      }
    );
    // set the origin to the center of the text
    this.weaponName.setOrigin(0.5, 0.5);

    // // Display weapon damage under the weapon name
    // this.weaponDamage = this.add.text(
    //   centerX,
    //   MONSTER_IMAGE_TOP + 450,
    //   `Damage: ${this.damage}`,
    //   {
    //     fontSize: "20px",
    //     color: "#FFFFFF",
    //   }
    // );

    // Display the Next button to the right of the weapon image
    this.nextButton = this.add.text(
      centerX + 200,
      MONSTER_IMAGE_TOP + 300,
      "Next",
      {
        fontSize: "20px",
        color: "#FFFFFF",
      }
    );
    // set the origin to the center of the text
    this.nextButton.setOrigin(0.5, 0.5);
    // Add a click event to the Next button
    this.nextButton.setInteractive();
    this.nextButton.on("pointerdown", () => {
      this.currentWeapon++;
      if (this.currentWeapon >= weapons.length) {
        this.currentWeapon = 0;
      }
      this.weapon.setTexture(`weapon${this.currentWeapon}`);
      this.weaponName.setText(weapons[this.currentWeapon].name);
      this.damage = weapons[this.currentWeapon].damage;
    });

    // Display the Previous button to the left of the weapon image
    this.prevButton = this.add.text(
      centerX - 200,
      MONSTER_IMAGE_TOP + 300,
      "Prev",
      {
        fontSize: "20px",
        color: "#FFFFFF",
      }
    );
    // set the origin to the center of the text
    this.prevButton.setOrigin(0.5, 0.5);
    // Add a click event to the Previous button
    this.prevButton.setInteractive();
    this.prevButton.on("pointerdown", () => {
      this.currentWeapon--;
      if (this.currentWeapon < 0) {
        this.currentWeapon = weapons.length - 1;
      }
      this.weapon.setTexture(`weapon${this.currentWeapon}`);
      this.weaponName.setText(weapons[this.currentWeapon].name);
      this.damage = weapons[this.currentWeapon].damage;
    });
  }

  onWeaponClicked(weaponId) {
    // Increase damage based on weapon
    this.damage = 13 + weaponId * 5;
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
