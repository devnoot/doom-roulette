// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import fs from 'fs'
import child from 'child_process'

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

        console.log(data.toString())
    })
})