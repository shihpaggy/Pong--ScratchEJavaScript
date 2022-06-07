//_____________________________________________________
//-------propriedades da bolinha-------

let diametroBolinha = 15;
let raioBolinha = diametroBolinha/5;

//-------posicao da bolinha-------

let xBolinha = 300;
let yBolinha = 200;

//-------velocidade da bolinha-------

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//_____________________________________________________
//-------propriedades da raquete-------

let larguraRaquete = 10;
let alturaRaquete = 90;

//-------posicao da raquete jogador-------

let xRaqueteJogador = 10;
let yRaqueteJogador = 150;

//-------posicao da raquete oponente-------

let xRaqueteOponente = 580;
let yRaqueteOponente = 150;

//-------velocidade da raquete oponente-------

let velocidadeYOponente; 

//_____________________________________________________
//-------colisao-------

let colisao = false;

//-------placar do jogo-------

let pontosJogador = 0;
let pontosOponente = 0;

//-------sons do jogo-------

let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("Sons/trilha.mp3");
  ponto = loadSound("Sons/ponto.mp3");
  raquetada = loadSound("Sons/raquetada.mp3");
}

//_____________________________________________________

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  incluirPlacar();
  criarBolinha();
  mexerBolinha();
  verificaColisaoBordaBolinha();
  criarRaquete(xRaqueteJogador,yRaqueteJogador);
  criarRaquete(xRaqueteOponente,yRaqueteOponente);
  mexerRaqueteJogador();
  mexerRaqueteOponente();
  verificaColisaoRaquete(xRaqueteJogador,yRaqueteJogador);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  marcaPonto();
}

//_____________________________________________________
//------- Funcoes da bolinha -------

function criarBolinha(){
  circle(xBolinha,yBolinha,diametroBolinha); 
}

function mexerBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBordaBolinha(){
  if(xBolinha+raioBolinha>width||xBolinha-raioBolinha<0){
    velocidadeXBolinha*= -1;
  }
  if(yBolinha+raioBolinha>height||yBolinha-raioBolinha<0){
    velocidadeYBolinha*= -1;
  }
}

//------- Funcoes da raquete-------

function criarRaquete(x,y){
  rect(x,y,larguraRaquete,alturaRaquete);
}

function verificaColisaoRaquete(x,y){
  colisao = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if(colisao){
    velocidadeXBolinha*=-1;
    raquetada.play();
  }
}

//------- Movimentacao da raquete-------

function mexerRaqueteJogador(){
  if(keyIsDown(87)){
    yRaqueteJogador -=10;
  }
  if(keyIsDown(83)){
    yRaqueteJogador +=10;
  }
}

function mexerRaqueteOponente(){
  if(keyIsDown(UP_ARROW)){
    yRaqueteOponente -=10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaqueteOponente +=10;
  }
}

//_____________________________________________________

function incluirPlacar(){
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(225);
  text(pontosJogador,170,26);
  fill(color(255,140,0));
  rect(450,10,40,20)
  fill(225);
  text(pontosOponente,470,26);
}

function marcaPonto(){
  if(xBolinha > 595){
    pontosJogador ++;
    ponto.play();
  }
  if(xBolinha < 5){
    pontosOponente ++;
    ponto.play();
  }
}
