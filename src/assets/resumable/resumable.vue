<template>
    <div class="upload">
        <div class="resumable-error" v-show="resumable_error">
            Your browser, unfortunately, is not supported by Resumable.js. The library requires support for <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a>            along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.
        </div>

        <div class='resumable-drop' v-show="$store.state.resumable_drop" :class="{'resumable-dragover': resumableDrag}" @dragover="resumableDrag=true"
            @drop="resumableDrag=false" @dragleave="resumableDrag=false">
            <el-button class="resumable-browse" size="small" type="primary">选择文件</el-button>
        </div>

        <div class="resumable-list" v-show="$store.state.resumable_list">
            {{zipName}}
            <!-- <ul v-for="file in fileList" :key="file.uniqueIdentifier"> -->
                <!-- <li :class="'resumable-file-' + file.uniqueIdentifier" style="position:relative; height: 30px"> -->
                    <!-- <span style="position: absolute;left: 0">{{file.load ? 'uploaded' : 'upload'}}</span> -->
                    <!-- <span class="resumable-file-name">{{file.fileName}}</span> -->
                    <!-- <span class="resumable-file-name">{{file.fileName}}</span> -->
                    <!-- <span class="resumable-file-progress" style="position: absolute;left:300px">
                    {{Math.floor(file.progress() * 100) + '%'}}
                    </span> -->
                    <!-- <span style="position:absolute;right:40px">{{file.size | size}}</span> -->
                    <!-- <el-button style="position:absolute;right:5px;" @click="removeFile(file)" type="text">X</el-button> -->
                <!-- </li> -->
                <!-- <li v-show="!file.load" :class="'resumable-progress-' + file.uniqueIdentifier" style="height:25px;margin-top:5px">
                    <table width="100%">
                        <tr>
                            <td width="80%" style="vertical-align:middle">
                                <div class="progress-container">
                                    <div class="progress-bar" :style="progress_bar"></div>
                                </div>
                            </td>
                            <td class="progress-text" nowrap="nowrap" :style="{color: 'activeColor'}">
                                {{progress_text}}
                            </td>
                        </tr>
                    </table>
                </li> -->
            <!-- </ul> -->
        </div>
    </div>
</template>

<style>
    .resumable-error {
        font-size: 14px;
        font-style: italic;
    }

    .resumable-drop {
        font-size: 13px;
        text-align: left;
        color: white;
        font-weight: bold;
        border-radius: 10px;
        z-index: 9999;
        float: left;
    }

    .resumable-dragover {
        padding: 30px;
        color: #555;
        background-color: #ddd;
        border: 1px solid #999;
    }
    /* Uploader: Progress bar */

    .progress-container {
        height: 7px;
        background: #9CBD94;
        position: relative;
    }

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #45913A;
        width: 0;
    }

    .progress-text {
        font-size: 11px;
        line-height: 9px;
        padding-left: 10px;
    }

    .resumable-file-name {
        position: absolute;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    ul {
        list-style: none;
        /*-webkit-padding-start: 0*/
    }

    .resumable-list {
        float: left;
    }
</style>

<script>
import Resumable from './resumable.js'

export default {
        data() {
            return {
                resumable_error: false,
                resumableDrag: false,
                activeColor: 'green',
                progress_text: '',
                progressState: true,
                progress_bar: {
                    width: ''
                },
                zipName: ''
            }
        },
        props: {
            /**传回的所有上传成功的文件*/
            uploadList: {
                type: Array,
                required: true
            },
            /** 每个上传的数据块的大小 单位 kb */
            chunkSize:{
                type:Number
            },
            /**同时上传数*/
            simultaneousUploads:{
                type:Number
            },
            /**上传方式 */
            method:{
                type:String
            },
            data:{
                type:Object,
                default:{}
            },
            target: {
                type: String,
                required: true
            },
            fileList: {           //已经上传过的文件显示
                type: Array,
                default: () => []
            },
            headers:{
                type:Object,
                default:{}
            },
            fileType: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            removeFile(file) {
                if (!file.load) {
                    file.cancel();
                }
                for (let i = 0; i < this.fileList.length; i++) {
                    if (this.fileList[i].uniqueIdentifier === file.uniqueIdentifier) {
                        this.fileList.splice(i, 1);
                    }
                }
                for (let i = 0; i < this.uploadList.length; i++) {
                    if (this.uploadList.uid === file.uniqueIdentifier) {
                        this.uploadList.splice(i, 1);
                    }
                }
            }
        },
        filters: {
            size: function (value) {
                if (!value) {
                    return 0;
                }
                let s = value / (1024 * 1024);
                if (parseInt(s, 10) > 0) {
                    return s.toFixed(1) + 'M';
                } else {
                    return (value / 1024).toFixed(1) + 'Kb'
                }
            }
        },
        watch: {
            fileList(newValue, oldValue) {
                if (newValue.length === 0) {
                    for (let i = 0; i < oldValue.length; i++) {
                        oldValue[i].cancel()
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                let r = new Resumable({
                    uploadMethod : "POST",
                    target: this.target,
                    chunkSize: this.chunkSize*1024 || 1024*1024,
                    simultaneousUploads: this.simultaneousUploads || 4,
                    testChunks: false,
                    method:this.method || "octet",
                    query:this.data || {},
                    headers:this.headers || {},
                    fileType:this.fileType||[]
                })
                this.r = r;
                if (!r.support) {
                    this.resumable_error = true;
                } else {
                    r.assignDrop(document.getElementsByClassName('resumable-drop'));
                    r.assignBrowse(document.getElementsByClassName('resumable-browse'));
                    r.on('fileAdded', (file) => {
                        this.fileList.push({
                            'uniqueIdentifier': file.uniqueIdentifier,
                            'fileName': file.fileName,
                            'progress': () => file.progress(),
                            'size': file.size,
                            'cancel': () => file.cancel(),
                            'load': false,             //是否已经上传过 
                        })
                        // r.upload()
                        this.$emit('fileAdded', file, r);
                        console.log(this.fileList)
                        if(this.fileList.length > 0){
                            this.zipName = this.fileList[this.fileList.length - 1].fileName;
                        }
                        this.$store.state.resumable_list = true;
                        this.$store.state.resumable_drop = false;
                    })
                    r.on('fileSuccess', (file, message) => {
                        console.info(message);
                        let res = JSON.parse(message);
                        
                        this.$emit('complete', file, message)
                        if(res.code == 0){
                            this.uploadList.push({ url: res.message, name: file.fileName, uid: file.uniqueIdentifier, size: file.size })
                            this.progress_text = '上传成功'
                        }else{
                            this.progressState = false;
                            this.activeColor = 'red';
                            this.progress_text = '上传失败';
                        }
                        
                    })
                    r.on('fileError', () => {
                        this.progressState = false;
                        this.activeColor = 'red';
                        this.progress_text = '上传失败';
                    })
                    r.on('fileProgress', (file) => {
                        this.progress_bar = {
                            width: Math.floor(file.progress() * 100) + '%'
                        }
                    })
                }
            })
        }
    }

</script>