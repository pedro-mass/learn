package com.mkyong.adapter;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.math.BigDecimal;

/**
 * Created by pedromass on 12/30/14.
 */
public class JaxbBigDecimalAdapter extends XmlAdapter<String, BigDecimal> {
    @Override
    public String marshal(BigDecimal obj) throws Exception {
        return obj.toString();
    }

    @Override
    public BigDecimal unmarshal(String obj) throws Exception {
        return new BigDecimal(obj.replaceAll(",", ""));
    }
}
