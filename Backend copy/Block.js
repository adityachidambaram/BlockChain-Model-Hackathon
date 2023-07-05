    const SHA256 = require('crypto-js/sha256');

    class Block {
        constructor(data, prevHash = ' ') {
            this.data = data;
            this.prevHash = prevHash;
            this.hash = this.calculateHash();
            //this.idHash = this.calculateIDHash();
            this.nonce = 0;
        }

        calculateHash() {
            return SHA256(this.prevHash + JSON.stringify(this.data) + this.nonce).toString();
        }


        mineBlock(difficulty){
            while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
                this.nonce++;
                this.hash = this.calculateHash();
            }


            //console.log("Block mined: "+ this.hash);
        }
    }

    class Blockchain {

        constructor() {
            this.chain = [this.createGenesisBlock()];
            this.difficulty = 2;
            this.iVotes = 0;
            this.cVotes = 0;
            this.kVotes = 0;
            this.list = {};
        }

        createGenesisBlock() {
            return new Block(0, '0');
        }


        addTotalVotes(name) {
            if(name==='Inban'){
                this.iVotes++;
            }
            if(name==='Chiddy') {
                this.cVotes++;
            }
            if(name==='Kushaal') {
                this.kVotes++;
            }
        }

        getTotalVotes() {
            return [this.iVotes, this.cVotes, this.kVotes];
        }


        getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }
        addBlock(newBlock) {

            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.mineBlock(this.difficulty);
            this.chain.push(newBlock);
            console.log(JSON.stringify(this, null, 4));
        }

        isChainValid(){
            for(let i = 1; i < this.chain.length;i++){
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i-1];

                if(currentBlock.hash !== currentBlock.calculateHash()){
                    return false;
                }

                if(currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }

            }
            return true;
        }

    }

    let votes = new Blockchain();
    //console.log('Mining block 1...');
    votes.addBlock(new Block("10017291 vote Kushaal"));

    //console.log('Mining block 2...');
    votes.addBlock(new Block("10017292 vote Kushaal"));

    //console.log('is blockchain valid !? '+ votes.isChainValid());
    //console.log(JSON.stringify(votes, null, 4));


    module.exports = {Block, Blockchain};

