

//% weight=10 color=#008B00 icon="\uf1eb" block="OSOYOO_BlackIR_V2"
namespace BitIR {
    


    let irstate:number;
    let state:number;
    
    export enum enIRButton {

      //% blockId="NUM1" block="NUM1"
      NUM1 = 0x00,
      //% blockId="NUM2" block="NUM2"
	  NUM2 = 0x01,
      //% blockId="NUM3" block="NUM3"
	  NUM3 = 0x02,
      //% blockId="NUM4" block="NUM4"
	  NUM4 = 0x03,
	  //% blockId="NUM5" block="NUM5"
	  NUM5 = 0x06,
      //% blockId="NUM6" block="NUM6"
	  NUM6 = 0x04,
	  //% blockId="NUM7" block="NUM7"
	  NUM7 = 0x08,
      //% blockId="NUM8" block="NUM8"
	  NUM8 = 0x09,
      //% blockId="NUM9" block="NUM9"
	  NUM9 = 0x0a,
	  //% blockId="NUM0" block="NUM0"
	  NUM0 = 0x07,
      //% blockId="Hash" block="Hash"
	  Hash = 0x05,
      //% blockId="STAR" block="STAR"
	  STAR = 0x0b,   
      //% blockId="UP" block="UP"
	  UP = 0x0d,
      //% blockId="LEFT" block="LEFT"
	  LEFT = 0x0f,
      //% blockId="OK" block="OK"
	  OK = 0x10,
      //% blockId="RIGHT" block="RIGHT"
	  RIGHT = 0x11,
      //% blockId="DOWN" block="DOWN"
	  DOWN = 0x13,

    }



     /**
     * Read IR sensor value V2.
     */

    //% advanced=true shim=Bit_IR::irCode
    function irCode(): number {
        return 0;
    }

    //% weight=5
    //% blockId=IR_KeyValue block="IR_KeyValue|value %value"
    export function IR_KeyValue(value: enIRButton): number {
        return value;
    }

    
    //% weight=5
    //% blockId=IR_readV2 block="read IR key value"
    export function IR_readV2(): number {
        return valuotokeyConversion();
    }

    //% weight=2
    //% blockId=IR_callbackUserV2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: number) => void) {
        state = 1;
        control.onEvent(11, 22, function() {
            cb(irstate);
        }) 
    }

    function valuotokeyConversion():number{
        let irdata:number;
        switch(irCode()){
        case 0xba45:irdata = 0;break;
        case 0xb946:irdata = 1;break;
        case 0xb847:irdata = 2;break;
        case 0xbb44:irdata = 3;break;
        case 0xbc43:irdata = 4;break;
        case 0xf20d:irdata = 5;break;
        case 0xbf40:irdata = 6;break;
        case 0xe619:irdata = 7;break;
        case 0xf807:irdata = 8;break;
        case 0xea15:irdata = 9;break;
        case 0xf609:irdata = 10;break;
        case 0xe916:irdata = 11;break;
        case 0xf30c:irdata = 12;break;
        case 0xe718:irdata = 13;break;
        case 0xa15e:irdata = 14;break;
        case 0xf708:irdata = 15;break;
        case 0xe31c:irdata = 16;break;
        case 0xa55a:irdata = 17;break;
        case 0xbd42:irdata = 18;break;
        case 0xad52:irdata = 19;break;
        case 0xb54a:irdata = 20;break;
            default:
             irdata = -1;
        }
        return irdata;
    }

    basic.forever(() => {
        if(state == 1){
            irstate = valuotokeyConversion();
            if(irstate != -1){
                control.raiseEvent(11, 22);
            }
        }
        
        basic.pause(20);
    })

}
