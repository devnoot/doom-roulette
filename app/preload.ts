// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import child from 'child_process';
import { contextBridge } from "electron";
import fs from 'fs';
import https from 'https'
import { join as joinPath } from 'path'
import extract from 'extract-zip'
import { type Entry } from 'yauzl';

const serialize = JSON.stringify
const deserialize = JSON.parse

const readConfig = () => {
    if (!fs.existsSync('config.json')) {
        // create new file
        fs.writeFileSync('config.json', serialize({
            odamex: '',
            gzdoom: '',
            pwads: '',
            iwads: ''
        }))
    }
    return deserialize(fs.readFileSync('config.json', { encoding: 'utf-8' }))
}

const writeConfig = (key: string, val: any) => {
    const cfg = readConfig()
    const newCfg = {
        ...cfg,
        [key]: val
    }
    fs.writeFileSync('config.json', serialize(newCfg))
}

const cfg = readConfig()


contextBridge.exposeInMainWorld('api', {
    odamex: cfg.odamex,
    setOdamex: (newPath: string) => writeConfig('odamex', newPath),

    gzdoom: cfg.gzdoom,
    setGzdoom: (path: string) => writeConfig('gzdoom', path),
    
    pwads: cfg.pwads,
    setPwads: (path: string) => writeConfig('pwads', path),

    iwads: cfg.iwads,
    setIwads: (path: string) => writeConfig('iwads', path),

    launchOdamex: (odamexArgs: string[] = []) => child.execFile(cfg.odamex, odamexArgs, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.info(data.toString())
    }),

    downloadToPath: (url: string, filename: string) => {
        return new Promise((resolve, reject) => {

            https.get(url, (res => {

                const cfg = readConfig()
                const targetDir = cfg.pwads || '.'
                const filepath = joinPath(targetDir, filename) 
                const filestream = fs.createWriteStream(filepath)
                res.pipe(filestream)
                
                filestream.on('finish', () => {
                    filestream.close()
                    // unzip the file and extract it to the same location. then return a list of the extract files
                    const entries: Entry[] = []
                    
                    extract(filepath, { 
                        dir: targetDir, 
                        onEntry: (entry, zipFile) => {
                            console.log({ entry })
                            entries.push(entry)
                        } 
                    })
                        .then(() => {
                            console.log('Download complete')
                            resolve(entries)   
                        })
                        .catch(err => reject(err))
                })   
    
            }))
        })

    }

})